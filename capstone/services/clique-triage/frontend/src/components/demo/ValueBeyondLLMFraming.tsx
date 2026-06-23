import {
  VALUE_BEYOND_LLM_ASSEMBLY,
  VALUE_BEYOND_LLM_ASSEMBLY_HIGHLIGHT,
  VALUE_BEYOND_LLM_BRIDGE,
  VALUE_BEYOND_LLM_COMPLEMENT,
  VALUE_BEYOND_LLM_COMPLEMENT_HIGHLIGHT,
  VALUE_BEYOND_LLM_EVIDENCE_SOURCES,
  VALUE_BEYOND_LLM_INVESTIGATION_FOCUS,
  VALUE_BEYOND_LLM_REPAIR_HIGHLIGHT,
  VALUE_BEYOND_LLM_WORKFLOW,
} from "../../demo/presentationNarrative";
import { boldHighlightPhrase } from "../../lib/highlightPhrase";

function ValueBeyondLLMResearchIntro() {
  return (
    <p className="approach-framing-text">
      Recent studies on dependency-driven failures (
      <a href="https://dl.acm.org/doi/full/10.1145/3576037" target="_blank" rel="noreferrer">
        TOSEM 2023
      </a>
      ,{" "}
      <a
        href="https://valerio-terragni.github.io/assets/pdf/jayasuriya-fse-2024.pdf"
        target="_blank"
        rel="noreferrer"
      >
        FSE 2024
      </a>
      ,{" "}
      <a href="https://arxiv.org/html/2407.03880v1" target="_blank" rel="noreferrer">
        Breaking-Good 2024
      </a>
      ,{" "}
      <a href="https://arxiv.org/abs/2401.09906" target="_blank" rel="noreferrer">
        BUMP 2024
      </a>
      ,{" "}
      <a href="https://arxiv.org/html/2505.07522" target="_blank" rel="noreferrer">
        Byam 2025
      </a>
      ) do not conclude that AI is ineffective. Instead, they repeatedly show that diagnosing these failures
      often requires correlating evidence from multiple locations:
    </p>
  );
}

function ValueBeyondLLMRepairResearch() {
  return (
    <p className="approach-framing-text">
      Research on AI-assisted repair (
      <a href="https://arxiv.org/html/2505.07522" target="_blank" rel="noreferrer">
        Byam 2025
      </a>
      ,{" "}
      <a href="https://doi.org/10.1145/3729366" target="_blank" rel="noreferrer">
        FSE 2025
      </a>
      ) and talks with open source maintainers further suggests that repair quality depends heavily on the
      quality and structure of the context supplied to the model. Systems that{" "}
      {boldHighlightPhrase(
        "first gather and organize evidence generally outperform workflows that rely on raw logs alone.",
        VALUE_BEYOND_LLM_REPAIR_HIGHLIGHT,
      )}
    </p>
  );
}

export function ValueBeyondLLMFraming() {
  return (
    <section className="approach-framing presentation-card">
      <p className="approach-framing-lead">{VALUE_BEYOND_LLM_BRIDGE}</p>

      <ValueBeyondLLMResearchIntro />

      <ul className="approach-packet-parts">
        {VALUE_BEYOND_LLM_EVIDENCE_SOURCES.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ul>

      <p className="approach-framing-text approach-framing-closing">
        {boldHighlightPhrase(VALUE_BEYOND_LLM_ASSEMBLY, VALUE_BEYOND_LLM_ASSEMBLY_HIGHLIGHT)}
      </p>

      <ValueBeyondLLMRepairResearch />

      <p className="approach-framing-text">{VALUE_BEYOND_LLM_INVESTIGATION_FOCUS}</p>

      <p className="approach-framing-text">{VALUE_BEYOND_LLM_WORKFLOW}</p>

      <p className="approach-framing-text approach-framing-closing">
        {boldHighlightPhrase(VALUE_BEYOND_LLM_COMPLEMENT, VALUE_BEYOND_LLM_COMPLEMENT_HIGHLIGHT)}
      </p>
    </section>
  );
}
