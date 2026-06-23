import type { ReactNode } from "react";
import { END_PRODUCT_PR_NUMBER, END_PRODUCT_REPO } from "../../../demo/presentationNarrative";

interface GitHubChromeShellProps {
  activeTab?: "conversation" | "checks";
  children: ReactNode;
}

export function GitHubChromeShell({ activeTab = "conversation", children }: GitHubChromeShellProps) {
  return (
    <div className="gh-mock gh-mock-light">
      <header className="gh-mock-header">
        <div className="gh-mock-header-left">
          <span className="gh-mock-mark" aria-hidden />
          <span className="gh-mock-repo">{END_PRODUCT_REPO}</span>
        </div>
      </header>

      <div className="gh-mock-pr-bar">
        <span className="gh-mock-pr-icon" aria-hidden />
        <span className="gh-mock-pr-number">#{END_PRODUCT_PR_NUMBER}</span>
      </div>

      <nav className="gh-mock-tabs" aria-label="Pull request tabs">
        <span className={`gh-mock-tab${activeTab === "conversation" ? " gh-mock-tab-active" : ""}`}>
          Conversation
        </span>
        <span className={`gh-mock-tab${activeTab === "checks" ? " gh-mock-tab-active" : ""}`}>Checks</span>
      </nav>

      <div className="gh-mock-body">{children}</div>
    </div>
  );
}
