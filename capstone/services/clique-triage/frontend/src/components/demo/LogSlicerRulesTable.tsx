import { LOG_SLICER_RULES, LOG_SLICER_RULES_TITLE } from "../../demo/presentationNarrative";

export function LogSlicerRulesTable() {
  return (
    <aside className="engine-diagram-log-slicer-rules" aria-label={LOG_SLICER_RULES_TITLE}>
      <p className="engine-diagram-log-slicer-rules-title">{LOG_SLICER_RULES_TITLE}</p>
      <table className="engine-diagram-log-slicer-rules-table">
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Rule</th>
          </tr>
        </thead>
        <tbody>
          {LOG_SLICER_RULES.map((row) => (
            <tr key={row.step}>
              <td className="engine-diagram-log-slicer-rules-step">{row.step}</td>
              <td>{row.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
