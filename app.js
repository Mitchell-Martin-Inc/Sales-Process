const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const sections = Array.from(document.querySelectorAll(".playbook-section"));
const navLinks = Array.from(document.querySelectorAll(".sidenav a"));
const backTop = document.querySelector("#backTop");
const intelForm = document.querySelector("#intelForm");
const intelVertical = document.querySelector("#intelVertical");
const intelBuyer = document.querySelector("#intelBuyer");
const intelRegion = document.querySelector("#intelRegion");
const intelSignal = document.querySelector("#intelSignal");
const intelRole = document.querySelector("#intelRole");
const intelHeadline = document.querySelector("#intelHeadline");
const intelNarrative = document.querySelector("#intelNarrative");
const intelSources = document.querySelector("#intelSources");
const intelQuestions = document.querySelector("#intelQuestions");
const intelTalkTrack = document.querySelector("#intelTalkTrack");
const intelOutreach = document.querySelector("#intelOutreach");
const intelDataStatus = document.querySelector("#intelDataStatus");
const intelMetrics = document.querySelector("#intelMetrics");
const pullBlsData = document.querySelector("#pullBlsData");
const copyIntel = document.querySelector("#copyIntel");
const copyAgentPrompt = document.querySelector("#copyAgentPrompt");
const refreshIntel = document.querySelector("#refreshIntel");

const verticalIntel = {
  healthcare: {
    label: "Healthcare",
    blsIndustry: "Health care and social assistance",
    blsPrefix: "JTS620000000000000",
    pressure: "patient access, clinical capacity, revenue-cycle execution, and digital health modernization",
    roles: "clinical systems analysts, Epic and EHR talent, revenue-cycle specialists, care operations leaders, data analysts, and healthcare IT project teams",
    proof: "compare health care hiring momentum, local wage bands, hospital demand signals, and active openings before the call",
    questions: [
      "Which clinical, revenue-cycle, or healthcare IT teams are carrying the most backlog right now?",
      "Where are vacancies affecting patient access, implementation timelines, or manager bandwidth?",
      "Which roles are repeatedly reaching final interview but not closing?"
    ]
  },
  it: {
    label: "IT",
    blsIndustry: "Information",
    blsPrefix: "JTS510000000000000",
    pressure: "modernization roadmaps, cybersecurity exposure, cloud migration, data programs, AI adoption, and delivery velocity",
    roles: "cloud engineers, cybersecurity specialists, data engineers, application developers, ERP/CRM talent, project managers, and product teams",
    proof: "compare information and professional-services hiring, skill availability, remote/on-site constraints, and market pay movement",
    questions: [
      "Which transformation work is slipping because permanent hiring cannot keep pace?",
      "Where are niche skills creating the biggest delivery or security risk?",
      "Which teams need contract capacity while leadership decides on full-time headcount?"
    ]
  },
  finance: {
    label: "Finance",
    blsIndustry: "Finance and insurance",
    blsPrefix: "JTS520000000000000",
    pressure: "close cycles, regulatory reporting, audit readiness, transformation programs, cost control, and financial planning discipline",
    roles: "FP&A analysts, accountants, controllers, audit consultants, risk and compliance talent, finance systems analysts, and banking operations specialists",
    proof: "compare financial-activities employment, wage benchmarks, regulatory change, and accounting or finance openings by market",
    questions: [
      "Which finance deadlines would be at risk if the current team lost one key person?",
      "Where are audit, reporting, close, or transformation needs creating temporary capacity gaps?",
      "Which roles require proven industry context rather than general accounting or finance experience?"
    ]
  }
};

const buyerIntel = {
  talent: "Frame the market around response speed, qualified slate quality, compensation calibration, and candidate drop-off risk.",
  executive: "Frame the market around business impact: delayed projects, operational drag, risk exposure, and the cost of open seats.",
  operations: "Frame the market around continuity, coverage, process bottlenecks, and where contract talent can remove near-term pressure.",
  procurement: "Frame the market around supplier performance, niche-fill capability, submittal quality, cycle time, and transparent market evidence."
};

const signalIntel = {
  "hiring spike": "Use posting volume and manager movement as the trigger. The sales point is speed before the market tightens further.",
  "hard-to-fill role": "Use scarcity, pay range, and competing demand as the trigger. The sales point is specialized reach and precise screening.",
  "leadership change": "Use new-executive priorities as the trigger. The sales point is flexible talent while the leader reshapes the team.",
  "cost pressure": "Use wage pressure and vacancy cost as the trigger. The sales point is targeted contract support without permanent overhead.",
  "project deadline": "Use implementation timing as the trigger. The sales point is delivery capacity that can start before internal hiring catches up.",
  "turnover risk": "Use quits, layoffs, and retention signals as the trigger. The sales point is continuity planning before a vacancy becomes urgent."
};

const sourceLinks = [
  { label: "BLS Public Data API", value: "Pull the latest JOLTS series directly into this page for a fast national demand snapshot." },
  { label: "BLS JOLTS", value: "Check job openings, hires, quits, and separations for the latest monthly labor-demand signal." },
  { label: "BLS Employment Situation", value: "Check industry job gains or losses and whether the vertical is expanding, flat, or contracting." },
  { label: "BLS OEWS", value: "Pull wage benchmarks for the role, state, and metro so rate guidance is grounded in public data." },
  { label: "LinkedIn Talent Insights", value: "Validate talent supply, employer competition, skill concentration, and location constraints." },
  { label: "Apollo / JobDiva", value: "Confirm account hiring managers, active openings, past submissions, MSA status, and ownership rules." }
];

const blsMeasures = [
  { code: "JOL", label: "Openings", suffix: "K", description: "job openings" },
  { code: "JOR", label: "Openings Rate", suffix: "%", description: "job openings rate" },
  { code: "HIL", label: "Hires", suffix: "K", description: "hires" },
  { code: "QUR", label: "Quits Rate", suffix: "%", description: "quits rate" }
];

let currentBlsData = [];

const sectionIndex = sections.map((section) => ({
  id: section.id,
  title: section.dataset.title || section.querySelector("h2")?.textContent || section.id,
  text: `${section.dataset.search || ""} ${section.textContent || ""}`.replace(/\s+/g, " ").trim()
}));

searchInput.addEventListener("input", handleSearch);
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", updatePageState, { passive: true });
intelForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  generateIntel();
});
refreshIntel?.addEventListener("click", generateIntel);
intelVertical?.addEventListener("change", () => {
  currentBlsData = [];
  intelDataStatus.textContent = "Ready to pull BLS data.";
  generateIntel();
  fetchBlsData();
});
pullBlsData?.addEventListener("click", fetchBlsData);
copyIntel?.addEventListener("click", copyIntelBrief);
copyAgentPrompt?.addEventListener("click", copyMarketAgentPrompt);
updatePageState();
generateIntel();
fetchBlsData();

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    searchResults.classList.remove("active");
    sections.forEach((section) => section.removeAttribute("hidden"));
    return;
  }

  const terms = query.split(/\s+/).filter(Boolean);
  const matches = sectionIndex
    .map((item) => {
      const haystack = item.text.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  sections.forEach((section) => {
    const isMatch = matches.some((match) => match.id === section.id);
    section.hidden = !isMatch;
  });

  if (!matches.length) {
    searchResults.classList.add("active");
    searchResults.innerHTML = '<p class="empty-state">No matching playbook sections yet.</p>';
    return;
  }

  searchResults.classList.add("active");
  matches.slice(0, 6).forEach((match) => {
    const link = document.createElement("a");
    link.className = "result-link";
    link.href = `#${match.id}`;
    link.innerHTML = `<span>${escapeHtml(match.title)}</span><small>${match.score} match${match.score === 1 ? "" : "es"}</small>`;
    link.addEventListener("click", () => {
      sections.forEach((section) => section.removeAttribute("hidden"));
      searchResults.classList.remove("active");
      searchInput.value = "";
    });
    searchResults.append(link);
  });
}

function updatePageState() {
  const scrollPosition = window.scrollY + 140;
  let currentId = sections[0]?.id;

  for (const section of sections) {
    if (!section.hidden && section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });

  backTop.classList.toggle("visible", window.scrollY > 680);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function generateIntel() {
  if (!intelForm) return;

  const vertical = verticalIntel[intelVertical.value];
  const buyer = buyerIntel[intelBuyer.value];
  const region = intelRegion.value;
  const signal = intelSignal.value;
  const role = intelRole.value.trim() || "specialized contract talent";

  intelHeadline.textContent = `${vertical.label} staffing brief for ${region}`;
  intelNarrative.textContent = `${vertical.label} buyers are balancing ${vertical.pressure}. For ${role}, lead with a ${signal} point of view: ${signalIntel[signal]} ${buyer}`;
  intelTalkTrack.textContent = `The market story is not "we have resumes." It is "we can show you where demand, pay, availability, and timing are moving, then use that evidence to build a faster hiring path for ${role}."`;
  intelOutreach.textContent = `I am tracking ${vertical.label.toLowerCase()} hiring signals in ${region}, especially around ${role}. A few indicators suggest teams may need flexible capacity before internal hiring catches up. Worth comparing notes for 15 minutes this week?`;

  renderList(intelSources, sourceLinks.map((source) => `${source.label}: ${source.value}`));
  renderList(intelQuestions, [
    ...vertical.questions,
    `What would a credible ${region} market snapshot need to show before you would adjust process, pay, or supplier coverage?`
  ]);
  renderMetrics(currentBlsData);
}

function renderList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.append(li);
  });
}

async function copyIntelBrief() {
  const brief = [
    intelHeadline.textContent,
    "",
    intelNarrative.textContent,
    "",
    "Current data pull:",
    ...formatBlsLines(),
    ...Array.from(intelSources.querySelectorAll("li")).map((item) => `- ${item.textContent}`),
    "",
    "Client questions:",
    ...Array.from(intelQuestions.querySelectorAll("li")).map((item) => `- ${item.textContent}`),
    "",
    `Talk track: ${intelTalkTrack.textContent}`,
    "",
    `Outreach starter: ${intelOutreach.textContent}`
  ].join("\n");

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(brief);
    copyIntel.textContent = "Copied";
  } else {
    copyIntel.textContent = "Select Text";
  }
  window.setTimeout(() => {
    copyIntel.textContent = "Copy Brief";
  }, 1400);
}

async function fetchBlsData() {
  const vertical = verticalIntel[intelVertical.value];
  const series = blsMeasures.map((measure) => ({
    ...measure,
    id: `${vertical.blsPrefix}${measure.code}`
  }));

  currentBlsData = [];
  renderMetrics(currentBlsData);
  intelDataStatus.textContent = `Pulling latest BLS JOLTS data for ${vertical.blsIndustry}...`;

  try {
    const results = await Promise.all(series.map(fetchBlsSeries));
    currentBlsData = results.filter(Boolean);
    renderMetrics(currentBlsData);
    intelDataStatus.textContent = currentBlsData.length
      ? `Latest BLS JOLTS pull loaded for ${vertical.blsIndustry}.`
      : "BLS returned no data for this pull.";
  } catch (error) {
    intelDataStatus.textContent = "BLS data could not be pulled in this browser. Use the source links or copy the agent prompt.";
    currentBlsData = [];
    renderMetrics(currentBlsData);
  }
}

async function fetchBlsSeries(series) {
  const response = await fetch(`https://api.bls.gov/publicAPI/v2/timeseries/data/${series.id}?latest=true`);
  if (!response.ok) throw new Error(`BLS request failed: ${response.status}`);

  const payload = await response.json();
  const data = payload?.Results?.series?.[0]?.data?.[0];
  if (!data) return null;

  return {
    ...series,
    period: `${data.periodName} ${data.year}`,
    value: data.value,
    preliminary: data.footnotes?.some((note) => note.code === "P")
  };
}

function renderMetrics(items) {
  if (!intelMetrics) return;
  intelMetrics.innerHTML = "";

  if (!items.length) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Click Pull BLS Data to load openings, openings rate, hires, and quits rate.";
    intelMetrics.append(placeholder);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "metric-card";
    card.innerHTML = `<span>${escapeHtml(item.label)}</span><b>${escapeHtml(formatMetricValue(item))}</b><small>${escapeHtml(item.period)}${item.preliminary ? " preliminary" : ""}</small>`;
    intelMetrics.append(card);
  });
}

function formatMetricValue(item) {
  return item.suffix === "%" ? `${item.value}%` : `${Number(item.value).toLocaleString()}${item.suffix}`;
}

function formatBlsLines() {
  if (!currentBlsData.length) return ["- BLS data not pulled yet."];
  return currentBlsData.map((item) => `- BLS ${item.description}: ${formatMetricValue(item)} for ${item.period}${item.preliminary ? " (preliminary)" : ""}. Series: ${item.id}.`);
}

async function copyMarketAgentPrompt() {
  const vertical = verticalIntel[intelVertical.value];
  const prompt = [
    "Create a concise market intelligence brief for a staffing sales rep.",
    "",
    `Vertical: ${vertical.label}`,
    `BLS proxy industry: ${vertical.blsIndustry}`,
    `Region: ${intelRegion.value}`,
    `Buyer persona: ${intelBuyer.options[intelBuyer.selectedIndex].textContent}`,
    `Signal: ${intelSignal.value}`,
    `Role or skill focus: ${intelRole.value.trim() || "specialized contract talent"}`,
    "",
    "Current data:",
    ...formatBlsLines(),
    "",
    "Use these sources and validation steps:",
    ...Array.from(intelSources.querySelectorAll("li")).map((item) => `- ${item.textContent}`),
    "",
    "Output:",
    "- Three market observations",
    "- Three buyer-specific discovery questions",
    "- One 90-word outreach email",
    "- One short call opener",
    "- One caution about what must be validated before client use",
    "",
    "Keep it specific, sales-ready, and suitable for a United States staffing company."
  ].join("\n");

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(prompt);
    copyAgentPrompt.textContent = "Prompt Copied";
  } else {
    copyAgentPrompt.textContent = "Copy Unavailable";
  }

  window.setTimeout(() => {
    copyAgentPrompt.textContent = "Copy Agent Prompt";
  }, 1400);
}
