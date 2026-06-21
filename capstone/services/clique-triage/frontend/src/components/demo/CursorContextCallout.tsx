interface CalloutSection {
  label?: string;
  text: string;
}

interface CursorContextCalloutProps {
  title: string;
  body?: string;
  sections?: CalloutSection[];
  footer?: string;
  variant?: "default" | "judge";
}

export function CursorContextCallout({
  title,
  body,
  sections,
  footer,
  variant = "default",
}: CursorContextCalloutProps) {
  return (
    <section
      className={`cursor-context-callout presentation-card${variant === "judge" ? " cursor-context-callout-judge" : ""}`}
    >
      <p className="cursor-context-callout-title">{title}</p>
      {body && <p className="cursor-context-callout-body">{body}</p>}
      {sections?.map((section) => (
        <div key={section.label ?? section.text.slice(0, 24)} className="cursor-context-callout-section">
          {section.label && (
            <p className="cursor-context-callout-section-label">{section.label}</p>
          )}
          <p className="cursor-context-callout-body">{section.text}</p>
        </div>
      ))}
      {footer && <p className="cursor-context-callout-footer">{footer}</p>}
    </section>
  );
}
