package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// IsolatedError represents the structured schema for our extracted logs
type IsolatedError struct {
	Service   string `json:"service"`
	Exception string `json:"exception"`
	Traceback string `json:"traceback"`
}

func main() {
	logPath := filepath.Join("data", "failed_build.log")
	outputPath := filepath.Join("data", "isolated_error.json")

	file, err := os.Open(logPath)
	if err != nil {
		fmt.Printf("Error opening build log file: %v\n", err)
		os.Exit(1)
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		fmt.Printf("Error reading build log file lines: %v\n", err)
		os.Exit(1)
	}

	var traceLines []string
	inTraceback := false
	isolatedException := ""

	// Parse the log to isolate the traceback and specific exception string
	for _, line := range lines {
		if strings.Contains(line, "Traceback (most recent call last):") {
			inTraceback = true
			traceLines = append(traceLines, line)
			continue
		}

		if inTraceback {
			traceLines = append(traceLines, line)
			if strings.Contains(line, "TypeError:") || strings.Contains(line, "ValueError:") || strings.Contains(line, "KeyError:") {
				isolatedException = strings.TrimSpace(line)
				inTraceback = false // End of traceback block
			}
		}
	}

	if len(traceLines) == 0 {
		fmt.Println("No matching functional runtime traceback found in target build data logs.")
		os.Exit(0)
	}

	// Construct the pre-sorted data payload
	outputPayload := IsolatedError{
		Service:   "payment_gateway",
		Exception: isolatedException,
		Traceback: strings.Join(traceLines, "\n"),
	}

	jsonData, err := json.MarshalIndent(outputPayload, "", "  ")
	if err != nil {
		fmt.Printf("Error compiling output structural layout payload: %v\n", err)
		os.Exit(1)
	}

	// Write the isolated context to the local datastore
	err = os.WriteFile(outputPath, jsonData, 0644)
	if err != nil {
		fmt.Printf("Error writing isolated database json chunk: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("✓ Build log analysis complete. Extracted exception signatures saved to data/isolated_error.json.")
}
