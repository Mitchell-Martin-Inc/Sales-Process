window.TOP_PERFORMERS_TICKER_CONFIG = {
  board: {
    eyebrow: "Leaderboard View",
    title: "Performance Leaderboards",
    subtitle: "",
    periodLabel: "Q2",
    tickerTitle: "GP Recognition Ticker",
    tickerSubtitle: "Top performers against gross profit, ready to swap from sample data to your Power BI or Fabric-backed feed.",
    leaderboardCaption: "Power BI-style top 5 rankings across the core activity and production metrics."
  },
  display: {
    locale: "en-US",
    currency: "USD",
    metricBoards: [
      { key: "primaryValue", label: "GP", format: "currency", feature: true },
      { key: "confirmedStartsValue", label: "Confirmed Starts", format: "number" },
      { key: "interviewsValue", label: "# of Interviews", format: "number" },
      { key: "submissionsValue", label: "# of Submissions", format: "number" },
      { key: "jobsValue", label: "# of Jobs", format: "number" },
      { key: "meetingsValue", label: "# of Meetings", format: "number" },
      { key: "dialsValue", label: "# of Dials", format: "number" }
    ],
    topCount: 10,
    visibleRows: 5,
    leaderboardScrollMs: 2600,
    rotationMs: 8000,
    refreshMs: 300000,
    tickerDurationSeconds: 34
  },
  metrics: {
    primaryLabel: "Total GP",
    primaryFormat: "currency",
    secondaryLabel: "% of Budget YTD",
    secondaryFormat: "percent",
    yearsAtMmiLabel: "Years at MMI",
    yearsAtMmiFormat: "number",
    dealsYtdLabel: "Deals YTD",
    dealsYtdFormat: "number",
    deltaFormat: "percent"
  },
  source: {
    type: "sample",

    /*
      Supported source types:
      - "sample": uses top-performers-ticker.sample-data.js
      - "json": fetches a URL that returns normalized JSON
      - "powerbi-proxy": fetches a backend/proxy that queries Power BI or Fabric for you

      Recommended production pattern:
      1. Keep browser mode pointed at your own proxy endpoint
      2. Let that proxy call the Power BI / Fabric Execute Queries API
      3. Return JSON to this page in either normalized or raw table-row form
    */

    endpoint: "",
    method: "GET",
    performersPath: "",
    updatedAtPath: "",
    headers: {},
    body: null,
    fieldMap: {
      name: "name",
      team: "team",
      summary: "summary",
      badge: "badge",
      primaryValue: "primaryValue",
      primaryLabel: "primaryLabel",
      primaryFormat: "primaryFormat",
      secondaryValue: "secondaryValue",
      secondaryLabel: "secondaryLabel",
      secondaryFormat: "secondaryFormat",
      yearsAtMmiValue: "yearsAtMmiValue",
      dealsYtdValue: "dealsYtdValue",
      daysAtPositionValue: "daysAtPositionValue",
      confirmedStartsValue: "confirmedStartsValue",
      interviewsValue: "interviewsValue",
      submissionsValue: "submissionsValue",
      jobsValue: "jobsValue",
      meetingsValue: "meetingsValue",
      dialsValue: "dialsValue",
      photoUrl: "photoUrl",
      delta: "delta",
      location: "location"
    }
  }
};
