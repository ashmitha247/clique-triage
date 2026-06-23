import { BUILD_STATUS_LABELS, BUILD_STATUS_ROWS } from "../../demo/presentationNarrative";

const STATUS_CLASS: Record<string, string> = {
  working: "build-status-pill-working",
  mocked: "build-status-pill-mocked",
  partial: "build-status-pill-partial",
  roadmap: "build-status-pill-roadmap",
};

export function BuildStatusTable() {
  return (
    <div className="build-status-table-wrap presentation-card">
      <table className="build-status-table">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Status</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          {BUILD_STATUS_ROWS.map((row) => (
            <tr
              key={row.feature}
              className={row.status === "mocked" ? "build-status-row-mocked" : undefined}
            >
              <td>{row.feature}</td>
              <td>
                <span className={`build-status-pill ${STATUS_CLASS[row.status]}`}>
                  {BUILD_STATUS_LABELS[row.status]}
                </span>
              </td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
