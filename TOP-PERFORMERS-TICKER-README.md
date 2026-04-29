# Top Performers Ticker

Open [top-performers-ticker.html](C:\Users\simon.storer\OneDrive - Mitchell Martin Inc\Documents\New project\top-performers-ticker.html) in a browser to run the monitor view. It is a standalone screen designed for office monitors, TV dashboards, or lobby displays.

## What is included

- [top-performers-ticker.html](C:\Users\simon.storer\OneDrive - Mitchell Martin Inc\Documents\New project\top-performers-ticker.html): the full-screen ticker UI with rotating spotlight, podium cards, leaderboard, and bottom ticker
- [top-performers-ticker.config.js](C:\Users\simon.storer\OneDrive - Mitchell Martin Inc\Documents\New project\top-performers-ticker.config.js): the place to switch between sample mode and a live source
- [top-performers-ticker.sample-data.js](C:\Users\simon.storer\OneDrive - Mitchell Martin Inc\Documents\New project\top-performers-ticker.sample-data.js): sample data so the screen works immediately

## Power BI / Fabric connection approach

For production, point the page at a backend or proxy instead of calling Power BI directly from the browser. That keeps tokens and service principal credentials out of the screen page.

Recommended flow:

1. Create a small backend endpoint, Power Automate flow, Azure Function, or internal API.
2. Have that backend query your Power BI or Fabric semantic model.
3. Return JSON to this page.
4. Change `source.type` in [top-performers-ticker.config.js](C:\Users\simon.storer\OneDrive - Mitchell Martin Inc\Documents\New project\top-performers-ticker.config.js) from `"sample"` to `"json"` or `"powerbi-proxy"`.
5. Set `endpoint`, `performersPath`, `updatedAtPath`, and `fieldMap` to match your response.

## Easiest normalized payload

If your backend returns this shape, the page will work with almost no extra mapping:

```json
{
  "updatedAt": "2026-04-14T09:30:00-04:00",
  "performers": [
    {
      "name": "Ava Martinez",
      "team": "Technology Staffing",
      "summary": "Closed the strongest week in the business.",
      "badge": "3-week streak",
      "primaryValue": 186000,
      "primaryLabel": "Revenue",
      "primaryFormat": "currency",
      "secondaryValue": 6,
      "secondaryLabel": "Placements",
      "secondaryFormat": "number",
      "delta": 0.24,
      "avatarText": "AM"
    }
  ]
}
```

## Raw Power BI / Fabric table rows

The page can also map raw row arrays or `ExecuteQueries` table row output if you set the paths and field names.

Example config:

```js
window.TOP_PERFORMERS_TICKER_CONFIG = {
  source: {
    type: "powerbi-proxy",
    endpoint: "https://your-company-api.example.com/top-performers",
    performersPath: "results.0.tables.0.rows",
    updatedAtPath: "updatedAt",
    fieldMap: {
      name: "RepName",
      team: "Division",
      summary: "Summary",
      badge: "Badge",
      primaryValue: "Revenue",
      primaryLabel: "MetricName",
      primaryFormat: "MetricFormat",
      secondaryValue: "Placements",
      secondaryLabel: "SecondaryMetricName",
      secondaryFormat: "SecondaryMetricFormat",
      delta: "DeltaPct",
      avatarText: "Initials"
    }
  }
};
```

## Notes for monitor deployment

- Use browser full-screen mode for clean display on wallboards and office monitors.
- The board refreshes automatically based on `refreshMs` in the config file.
- The spotlight performer rotates automatically based on `rotationMs`.
- If you serve this from an internal web server, JSON/API fetches will behave more reliably than opening the file directly from disk.
