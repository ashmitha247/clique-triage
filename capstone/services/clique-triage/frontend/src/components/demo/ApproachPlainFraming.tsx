import {
  APPROACH_PLAIN_CORE,
  APPROACH_PLAIN_CORE_HIGHLIGHT,
  APPROACH_PLAIN_EXTENSION_ROLE_AFTER,
  APPROACH_PLAIN_EXTENSION_ROLE_BEFORE,
  APPROACH_PLAIN_EXTENSION_ROLE_EMPHASIS,
  APPROACH_PLAIN_HANDOFF_CLOSING,
  APPROACH_PLAIN_HANDOFF_CLOSING_HIGHLIGHT,
  APPROACH_PLAIN_HANDOFF_FOLLOWUP,
  APPROACH_PLAIN_HANDOFF_FOLLOWUP_HIGHLIGHT,
  APPROACH_PLAIN_PACKET_PARTS,
  APPROACH_PLAIN_PACKET_TERM,
  APPROACH_PLAIN_WHY_TITLE,
} from "../../demo/presentationNarrative";
import { boldHighlightPhrase, highlightPhrase } from "../../lib/highlightPhrase";

function ApproachPlainResearch() {
  return (
    <p className="approach-framing-text">
      This design is motivated by research on dependency-related build failures. Studies such as{" "}
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
      , and{" "}
      <a href="https://arxiv.org/html/2407.03880v1" target="_blank" rel="noreferrer">
        Breaking-Good 2024
      </a>{" "}
      show that when a build breaks after a dependency update, the relevant evidence is often distributed
      across multiple sources.
    </p>
  );
}

export function ApproachPlainFraming() {
  return (
    <section className="approach-framing presentation-card">
      <p className="approach-framing-lead">
        {boldHighlightPhrase(APPROACH_PLAIN_CORE, APPROACH_PLAIN_CORE_HIGHLIGHT)}
      </p>

      <h3 className="approach-framing-heading">{APPROACH_PLAIN_WHY_TITLE}</h3>

      <p className="approach-framing-text">
        {APPROACH_PLAIN_EXTENSION_ROLE_BEFORE}
        <em>{APPROACH_PLAIN_EXTENSION_ROLE_EMPHASIS}</em>
        {APPROACH_PLAIN_EXTENSION_ROLE_AFTER}
      </p>

      <ul className="approach-packet-parts">
        {APPROACH_PLAIN_PACKET_PARTS.map((part) => (
          <li key={part}>{part}</li>
        ))}
      </ul>

      <p className="approach-framing-text approach-framing-term">{APPROACH_PLAIN_PACKET_TERM}</p>

      <ApproachPlainResearch />

      <p className="approach-framing-text approach-framing-closing">
        {boldHighlightPhrase(APPROACH_PLAIN_HANDOFF_CLOSING, APPROACH_PLAIN_HANDOFF_CLOSING_HIGHLIGHT)}
      </p>

      <p className="approach-framing-text approach-framing-emphasis-block">
        {highlightPhrase(
          APPROACH_PLAIN_HANDOFF_FOLLOWUP,
          APPROACH_PLAIN_HANDOFF_FOLLOWUP_HIGHLIGHT,
          "copy-packet-accent",
        )}
      </p>
    </section>
  );
}
