export interface MaintainerQuoteCard {
  name: string;
  title: string;
  quotes: string[];
  insightBullets?: string[];
}

export const MAINTAINER_QUOTES: MaintainerQuoteCard[] = [
  {
    name: "Huda Naaz",
    title: "CNCF open source maintainer · kuberef",
    quotes: [
      "When a clean PR breaks out of nowhere, it is an indicator in itself to look at recent external update logs.",
      "Figuring out the root cause and connecting the update to the breaking change or runtime behaviour can be time consuming.",
    ],
    insightBullets: [
      "Unexpected failures often require looking beyond repository code.",
      "External dependency updates can be relevant even when the PR itself appears clean.",
      "Connecting a failure to an upstream change can take significant investigation effort.",
    ],
  },
  {
    name: "Ajeet Singh",
    title: "Software developer & maintainer · Open Sox",
    quotes: [
      "finding the issue is always the most time taking part",
      "i use cursor and yeah it does help if the context within it's reach",
      "github has a bot feature that detects outdated dependencies. i use that.",
    ],
  },
];

export const MAINTAINER_QUOTE_EMPHASIS: Record<string, string[]> = {
  "Figuring out the root cause and connecting the update to the breaking change or runtime behaviour can be time consuming.":
    ["time consuming"],
  "i use cursor and yeah it does help if the context within it's reach": ["context within it's reach"],
};
