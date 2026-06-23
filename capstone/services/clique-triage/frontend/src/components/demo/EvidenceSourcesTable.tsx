import { ROADMAP_EXTENSION_SOURCES, ROADMAP_EXTENSION_SOURCES_TITLE } from "../../demo/presentationNarrative";

function sourceRowClass(category: string): string {
  if (category.toLowerCase().includes("demo")) return "evidence-sources-row-demo";
  if (category.toLowerCase().includes("roadmap") || category.toLowerCase().includes("api")) {
    return "evidence-sources-row-product";
  }
  return "";
}

export function EvidenceSourcesTable() {
  return (
    <section className="presentation-card">
      <h3 className="approach-column-title">{ROADMAP_EXTENSION_SOURCES_TITLE}</h3>
      <div className="evidence-sources-table evidence-sources-table-light" role="table">
        <div className="evidence-sources-row evidence-sources-header" role="row">
          <span className="evidence-sources-cell evidence-sources-category" role="columnheader">
            Category
          </span>
          <span className="evidence-sources-cell evidence-sources-name" role="columnheader">
            Source
          </span>
          <span className="evidence-sources-cell evidence-sources-influence" role="columnheader">
            Influences output
          </span>
        </div>
        {ROADMAP_EXTENSION_SOURCES.map((source) => (
          <div
            key={`${source.category}:${source.name}`}
            className={`evidence-sources-row ${sourceRowClass(source.category)}`}
            role="row"
          >
            <span className="evidence-sources-cell evidence-sources-category" role="cell">
              {source.category}
            </span>
            <span className="evidence-sources-cell evidence-sources-name" role="cell">
              {"url" in source && source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.name}
                </a>
              ) : (
                <code>{source.name}</code>
              )}
            </span>
            <span className="evidence-sources-cell evidence-sources-influence" role="cell">
              {source.influences}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
