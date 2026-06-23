import type { ReactNode } from "react";

export function highlightPhrase(text: string, phrase: string, className = "copy-highlight"): ReactNode {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className={className}>{phrase}</mark>
      {text.slice(index + phrase.length)}
    </>
  );
}

export function underlinePhrase(text: string, phrase: string, className = "copy-underline"): ReactNode {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{phrase}</span>
      {text.slice(index + phrase.length)}
    </>
  );
}

export function boldHighlightPhrase(
  text: string,
  phrase: string,
  className = "copy-bold-highlight",
): ReactNode {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <strong className={className}>{phrase}</strong>
      {text.slice(index + phrase.length)}
    </>
  );
}

export function highlightStyledPhrases(
  text: string,
  entries: readonly { phrase: string; className?: string; variant?: "mark" | "strong" | "em" | "underline" }[],
): ReactNode {
  let nodes: ReactNode[] = [text];

  for (const { phrase, className, variant = "mark" } of entries) {
    nodes = nodes.flatMap((node, nodeIndex) => {
      if (typeof node !== "string") return [node];
      const index = node.indexOf(phrase);
      if (index === -1) return [node];

      const parts: ReactNode[] = [];
      if (index > 0) parts.push(node.slice(0, index));
      if (variant === "strong") {
        parts.push(
          <strong key={`${phrase}-${nodeIndex}`} className={className}>
            {phrase}
          </strong>,
        );
      } else if (variant === "em") {
        parts.push(
          <em key={`${phrase}-${nodeIndex}`} className={className}>
            {phrase}
          </em>,
        );
      } else if (variant === "underline") {
        parts.push(
          <span key={`${phrase}-${nodeIndex}`} className={className ?? "copy-underline"}>
            {phrase}
          </span>,
        );
      } else {
        parts.push(
          <mark key={`${phrase}-${nodeIndex}`} className={className}>
            {phrase}
          </mark>,
        );
      }
      if (index + phrase.length < node.length) parts.push(node.slice(index + phrase.length));
      return parts;
    });
  }

  return <>{nodes}</>;
}

export function highlightPhrases(text: string, phrases: string[], className = "copy-highlight"): ReactNode {
  let nodes: ReactNode[] = [text];

  for (const phrase of phrases) {
    nodes = nodes.flatMap((node, nodeIndex) => {
      if (typeof node !== "string") return [node];
      const index = node.indexOf(phrase);
      if (index === -1) return [node];

      const parts: ReactNode[] = [];
      if (index > 0) parts.push(node.slice(0, index));
      parts.push(
        <mark key={`${phrase}-${nodeIndex}`} className={className}>
          {phrase}
        </mark>,
      );
      if (index + phrase.length < node.length) parts.push(node.slice(index + phrase.length));
      return parts;
    });
  }

  return <>{nodes}</>;
}
