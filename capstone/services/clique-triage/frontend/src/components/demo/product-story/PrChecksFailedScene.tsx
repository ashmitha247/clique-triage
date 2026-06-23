import {
  END_PRODUCT_CHECK_ERROR,
  END_PRODUCT_CHECK_NAME,
  END_PRODUCT_PR_TITLE,
} from "../../../demo/presentationNarrative";
import { BuildStatusChip } from "./BuildStatusChip";
import { GitHubChromeShell } from "./GitHubChromeShell";

export function PrChecksFailedScene() {
  return (
    <GitHubChromeShell activeTab="checks">
      <div className="gh-mock-pr-main">
        <h2 className="gh-mock-pr-title">{END_PRODUCT_PR_TITLE}</h2>
        <p className="gh-mock-pr-meta">
          <span className="gh-mock-status gh-mock-status-open">Open</span>
          wants to merge into <code>main</code>
        </p>

        <div className="gh-mock-checks-panel">
          <ul className="gh-mock-checks-list">
            <li className="gh-mock-check-row gh-mock-check-failed">
              <span className="gh-mock-check-icon" aria-hidden>
                ✗
              </span>
              <div className="gh-mock-check-body">
                <span className="gh-mock-check-name">{END_PRODUCT_CHECK_NAME}</span>
                <span className="gh-mock-check-detail">{END_PRODUCT_CHECK_ERROR}</span>
              </div>
              <BuildStatusChip status="roadmap" />
            </li>
            <li className="gh-mock-check-row gh-mock-check-passed">
              <span className="gh-mock-check-icon" aria-hidden>
                ✓
              </span>
              <div className="gh-mock-check-body">
                <span className="gh-mock-check-name">lint / eslint</span>
                <span className="gh-mock-check-detail">Successful in 42s</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </GitHubChromeShell>
  );
}
