import type { ReactNode } from "react";
import {
  ORIGIN_EMPIRICAL_PAPERS_PHRASE,
  ORIGIN_STORY,
  ORIGIN_RESEARCH_HIGHLIGHT,
  ORIGIN_RESEARCH_NICHE_PHRASE,
  ORIGIN_RESEARCH_SUGGESTED,
  UNDER_THE_HOOD_PHASES,
  WEB_RESEARCH_FINDINGS,
  HUDA_TODAY_CLIQUE_INTENT_AUDIENCE,
  HUDA_TODAY_CLIQUE_INTENT_EXTENSION_WORD,
  HUDA_TODAY_CLIQUE_INTENT_LEAD,
  HUDA_TODAY_CLIQUE_INTENT_TAGLINE,
  HUDA_TODAY_EXTENSION_FOOTER,
  HUDA_TODAY_HEAVY_CALLOUTS,
  HUDA_TODAY_MANUAL_HEAVY,
  HUDA_TODAY_MANUAL_READ,
  HUDA_TODAY_MANUAL_TITLE,
  EXTENSION_TYPES_UNDERLINE_PHRASES,
  MAINTAINER_VALIDATION_FRICTION_PHRASE,
  MAINTAINER_VALIDATION_INTRO,
  MAINTAINER_VALIDATION_RESEARCH_PHRASE,
  MAINTAINER_VALIDATION_SUMMARY,
} from "../../demo/presentationNarrative";
import { getDemoStepMeta } from "../../demo/demoStepMeta";
import { getPreludeStepMeta } from "../../demo/presentationStepMeta";
import { MAINTAINER_QUOTES, MAINTAINER_QUOTE_EMPHASIS } from "../../demo/maintainerResearch";
import type { TransformedWorkspace } from "../../types/workspace";
import { highlightPhrase, highlightPhrases, highlightStyledPhrases, underlinePhrase } from "../../lib/highlightPhrase";
import { ApproachPlainFraming } from "./ApproachPlainFraming";
import { BuildStatusTable } from "./BuildStatusTable";
import { CliqueApproachFlow } from "./CliqueApproachFlow";
import { DemoScenarioIntroContent } from "./DemoScenarioIntroContent";
import { EvidenceSourcesTable } from "./EvidenceSourcesTable";
import { PacketRationaleTable } from "./PacketRationaleTable";
import { PdfPageFrame } from "./PdfPageFrame";
import { ProcessingPipelineDiagram } from "./product-story/ProcessingPipelineDiagram";
import { PrChecksFailedScene } from "./product-story/PrChecksFailedScene";
import { CliquePacketCommentScene } from "./product-story/CliquePacketCommentScene";
import { CursorMcpHandoffScene } from "./product-story/CursorMcpHandoffScene";
import { TechnicalEngineDiagram } from "./TechnicalEngineDiagram";
import { UnderTheHoodFlow } from "./UnderTheHoodFlow";
import { ValueBeyondLLMFraming } from "./ValueBeyondLLMFraming";

interface PdfDeckExportProps {
  data: TransformedWorkspace;
}

function PdfDeckPage({
  children,
  compact,
  className,
}: {
  children: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <section
      className={[
        "pdf-deck-page",
        compact ? "pdf-deck-page-compact" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

function HudaWorkflowContent() {
  return (
    <>
      <section className="presentation-card workflow-manual-card">
        <h3 className="niche-spec-title">{HUDA_TODAY_MANUAL_TITLE}</h3>
        <div className="workflow-manual-flow">
          <p className="workflow-manual-step">{HUDA_TODAY_MANUAL_READ}</p>
          <div className="workflow-manual-arrow-slot" aria-hidden>
            <span className="workflow-manual-arrow-static">↓</span>
          </div>
          <div className="workflow-manual-heavy-wrap" aria-label="Heavy manual work">
            <div className="workflow-heavy-arena">
              {HUDA_TODAY_HEAVY_CALLOUTS.map((callout) => (
                <div
                  key={callout.label}
                  className={`workflow-heavy-callout workflow-heavy-callout-${callout.position}${callout.position === "bottom" ? " workflow-heavy-callout-bottom-lower" : ""}`}
                >
                  <span>{callout.label}</span>
                </div>
              ))}
              <div className="workflow-manual-heavy-circle">
                <ol className="workflow-manual-heavy-list">
                  {HUDA_TODAY_MANUAL_HEAVY.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-card workflow-clique-intent">
        <p className="workflow-clique-intent-tagline copy-accent-line">{HUDA_TODAY_CLIQUE_INTENT_TAGLINE}</p>
        <p className="workflow-clique-intent-lead">
          {highlightPhrase(
            HUDA_TODAY_CLIQUE_INTENT_LEAD,
            HUDA_TODAY_CLIQUE_INTENT_EXTENSION_WORD,
            "copy-highlight-extension",
          )}
        </p>
        <p className="workflow-clique-intent-audience">{HUDA_TODAY_CLIQUE_INTENT_AUDIENCE}</p>
      </section>

      <p className="workflow-extension-footer presentation-card copy-accent-line">
        {highlightStyledPhrases(
          HUDA_TODAY_EXTENSION_FOOTER,
          EXTENSION_TYPES_UNDERLINE_PHRASES.map((phrase) => ({ phrase, variant: "underline" as const })),
        )}
      </p>
    </>
  );
}

export function PdfDeckExport({ data }: PdfDeckExportProps) {
  const originMeta = getPreludeStepMeta("origin");
  const webMeta = getPreludeStepMeta("web-research");
  const maintainerMeta = getPreludeStepMeta("maintainer-validation");
  const hudaMeta = getPreludeStepMeta("huda-today");
  const approachMeta = getPreludeStepMeta("approach-plain");
  const valueMeta = getPreludeStepMeta("value-beyond-llm");
  const underHoodMeta = getPreludeStepMeta("under-the-hood");
  const techMeta = getPreludeStepMeta("technical-architecture");
  const sourcesMeta = getPreludeStepMeta("data-sources");

  const demoIntroMeta = getDemoStepMeta("demo-scenario-intro");
  const demoPrMeta = getDemoStepMeta("demo-pr-failure");
  const demoProcessingMeta = getDemoStepMeta("demo-processing-pipeline");
  const demoPacketMeta = getDemoStepMeta("demo-packet-delivery");
  const demoCursorMeta = getDemoStepMeta("demo-cursor-handoff");
  const demoBuildMeta = getDemoStepMeta("demo-build-status");

  return (
    <div className="pdf-export-deck">
      <PdfDeckPage compact>
        <PdfPageFrame section="problem" title={originMeta.title} compact>
          <section className="intro-story presentation-card">
            {ORIGIN_STORY.map((paragraph) => (
              <p key={paragraph} className="intro-story-paragraph">
                {underlinePhrase(paragraph, ORIGIN_EMPIRICAL_PAPERS_PHRASE)}
              </p>
            ))}
          </section>
          <h3 className="niche-spec-title">Papers and stats</h3>
          <div className="research-citation-grid pdf-origin-grid">
            {WEB_RESEARCH_FINDINGS.map((item) => (
              <article key={item.source} className="research-citation-card presentation-card">
                <p className="research-citation-headline">{item.headline}</p>
                <p className="research-citation-finding">{item.finding}</p>
                <p className="research-citation-source">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.source}
                  </a>
                </p>
                <p className="research-citation-use">{item.use}</p>
              </article>
            ))}
          </div>
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage>
        <PdfPageFrame section="problem" title={webMeta.title}>
          <section className="intro-story presentation-card">
            {ORIGIN_RESEARCH_SUGGESTED.map((paragraph, index) => (
              <p key={paragraph} className="intro-story-paragraph">
                {index === 0
                  ? highlightPhrase(paragraph, ORIGIN_RESEARCH_HIGHLIGHT)
                  : paragraph.includes(ORIGIN_RESEARCH_NICHE_PHRASE)
                    ? highlightPhrases(paragraph, [ORIGIN_RESEARCH_NICHE_PHRASE])
                    : paragraph}
              </p>
            ))}
          </section>
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage>
        <PdfPageFrame
          section="problem"
          title={maintainerMeta.title}
          subtitle={maintainerMeta.subtitle}
        >
          <p className="intro-story-paragraph presentation-card">{MAINTAINER_VALIDATION_INTRO}</p>
          <div className="research-quote-grid">
            {MAINTAINER_QUOTES.map((maintainer) => (
              <article key={maintainer.name} className="approach-quote-card">
                <h3 className="approach-quote-name">{maintainer.name}</h3>
                <p className="approach-quote-title">{maintainer.title}</p>
                <div className="approach-quote-blocks">
                  {maintainer.quotes.map((quote) => (
                    <blockquote key={quote} className="approach-quote-text">
                      {MAINTAINER_QUOTE_EMPHASIS[quote]
                        ? highlightPhrases(quote, MAINTAINER_QUOTE_EMPHASIS[quote])
                        : quote}
                    </blockquote>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <section className="presentation-card maintainer-validation-summary">
            {MAINTAINER_VALIDATION_SUMMARY.map((paragraph) => (
              <p key={paragraph} className="intro-story-paragraph">
                {paragraph.includes(MAINTAINER_VALIDATION_RESEARCH_PHRASE)
                  ? highlightStyledPhrases(paragraph, [
                      { phrase: MAINTAINER_VALIDATION_FRICTION_PHRASE },
                      { phrase: MAINTAINER_VALIDATION_RESEARCH_PHRASE, variant: "underline" },
                    ])
                  : paragraph.includes(MAINTAINER_VALIDATION_FRICTION_PHRASE)
                    ? highlightPhrases(paragraph, [MAINTAINER_VALIDATION_FRICTION_PHRASE])
                    : paragraph}
              </p>
            ))}
          </section>
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact className="pdf-huda-workflow-page">
        <PdfPageFrame
          section="under-hood"
          title={hudaMeta.title}
          subtitle={hudaMeta.subtitle}
          compact
        >
          <HudaWorkflowContent />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage>
        <PdfPageFrame
          section="under-hood"
          title={approachMeta.title}
          subtitle={approachMeta.subtitle}
        >
          <CliqueApproachFlow />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame section="under-hood" showHeader={false} compact>
          <ApproachPlainFraming />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame section="vs-llm" title={valueMeta.title} compact>
          <ValueBeyondLLMFraming />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame section="under-hood" title={underHoodMeta.title} compact>
          <UnderTheHoodFlow phases={UNDER_THE_HOOD_PHASES} range="full" />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame
          section="sources"
          title={techMeta.title}
          subtitle={techMeta.subtitle}
          canvasClassName="presentation-canvas-engine-diagram"
          compact
        >
          <TechnicalEngineDiagram range="through-isolated" />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame
          section="sources"
          title={techMeta.title}
          showHeader={false}
          canvasClassName="presentation-canvas-engine-diagram"
          compact
        >
          <TechnicalEngineDiagram range="from-triage" />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame
          section="sources"
          title={techMeta.title}
          showHeader={false}
          canvasClassName="presentation-canvas-engine-diagram"
          compact
        >
          <TechnicalEngineDiagram range="rest" />
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact className="pdf-data-sources-page">
        <PdfPageFrame
          section="sources"
          title={sourcesMeta.title}
          subtitle={sourcesMeta.subtitle}
          compact
        >
          <div className="pdf-data-sources-content">
            <EvidenceSourcesTable />
            <PacketRationaleTable />
          </div>
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact className="pdf-demo-scenario-page">
        <PdfPageFrame
          section="demo"
          title={demoIntroMeta.title}
          subtitle={demoIntroMeta.subtitle}
          canvasClassName="presentation-canvas-demo-section"
          compact
        >
          <DemoScenarioIntroContent />
          <div className="pdf-demo-scenario-pr">
            <h3 className="pdf-demo-scenario-pr-title">{demoPrMeta.title}</h3>
            {demoPrMeta.subtitle ? (
              <p className="pdf-demo-scenario-pr-subtitle">{demoPrMeta.subtitle}</p>
            ) : null}
            <PrChecksFailedScene />
            {demoPrMeta.caption ? <p className="demo-section-caption">{demoPrMeta.caption}</p> : null}
          </div>
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame
          section="demo"
          title={demoProcessingMeta.title}
          subtitle={demoProcessingMeta.subtitle}
          canvasClassName="presentation-canvas-demo-section"
          compact
        >
          <ProcessingPipelineDiagram />
          {demoProcessingMeta.caption ? (
            <p className="demo-section-caption">{demoProcessingMeta.caption}</p>
          ) : null}
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage>
        <PdfPageFrame
          section="demo"
          title={demoPacketMeta.title}
          subtitle={demoPacketMeta.subtitle}
          canvasClassName="presentation-canvas-demo-section"
        >
          <div className="demo-story-mock-wrap">
            <CliquePacketCommentScene
              leadPrimary={data.investigationLead.primary}
              supporting={data.investigationLead.supporting}
              examinedCount={data.evidenceSummary.examinedCount}
              discardedCount={data.discarded.length}
            />
          </div>
          {demoPacketMeta.caption ? <p className="demo-section-caption">{demoPacketMeta.caption}</p> : null}
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage>
        <PdfPageFrame
          section="demo"
          title={demoCursorMeta.title}
          subtitle={demoCursorMeta.subtitle}
          canvasClassName="presentation-canvas-demo-section"
        >
          <CursorMcpHandoffScene
            leadPrimary={data.investigationLead.primary}
            supporting={data.investigationLead.supporting}
            examinedCount={data.evidenceSummary.examinedCount}
            discardedCount={data.discarded.length}
          />
          {demoCursorMeta.caption ? <p className="demo-section-caption">{demoCursorMeta.caption}</p> : null}
        </PdfPageFrame>
      </PdfDeckPage>

      <PdfDeckPage compact>
        <PdfPageFrame
          section="demo"
          title={demoBuildMeta.title}
          subtitle={demoBuildMeta.subtitle}
          canvasClassName="presentation-canvas-demo-section"
          compact
        >
          <BuildStatusTable />
        </PdfPageFrame>
      </PdfDeckPage>

    </div>
  );
}
