const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const resourceTitle = document.querySelector("#resourceTitle");
const resourceList = document.querySelector("#resourceList");
const topbar = document.querySelector(".topbar");
const searchBand = document.querySelector(".search-band");
const sections = Array.from(document.querySelectorAll(".playbook-section"));
const navLinks = Array.from(document.querySelectorAll(".toplinks a[href^='#']"));
const pageLinks = Array.from(document.querySelectorAll(".toplinks a[href^='#'], .home-play-grid a[href^='#']"));
const backTop = document.querySelector("#backTop");
const intelForm = document.querySelector("#intelForm");
const intelVertical = document.querySelector("#intelVertical");
const intelBuyer = document.querySelector("#intelBuyer");
const intelRegion = document.querySelector("#intelRegion");
const intelSignal = document.querySelector("#intelSignal");
const intelRole = document.querySelector("#intelRole");
const intelHeadline = document.querySelector("#intelHeadline");
const intelNarrative = document.querySelector("#intelNarrative");
const intelQuestions = document.querySelector("#intelQuestions");
const intelTalkTrack = document.querySelector("#intelTalkTrack");
const intelOutreach = document.querySelector("#intelOutreach");
const intelDataStatus = document.querySelector("#intelDataStatus");
const intelMetrics = document.querySelector("#intelMetrics");
const intelRoles = document.querySelector("#intelRoles");
const intelSkills = document.querySelector("#intelSkills");
const backPage = document.querySelector("#backPage");
const homePage = document.querySelector("#homePage");
const pullBlsData = document.querySelector("#pullBlsData");
const copyIntel = document.querySelector("#copyIntel");
const copyAgentPrompt = document.querySelector("#copyAgentPrompt");
const refreshIntel = document.querySelector("#refreshIntel");
const meetingTiles = Array.from(document.querySelectorAll(".meeting-tile"));
const meetingPanels = Array.from(document.querySelectorAll(".meeting-detail-panel"));
const callStepButtons = Array.from(document.querySelectorAll(".bd-call-track button"));
const callStepPanels = Array.from(document.querySelectorAll(".call-step-panel"));
const objectionForm = document.querySelector("#objectionForm");
const objectionInput = document.querySelector("#objectionInput");
const objectionResponse = document.querySelector("#objectionResponse");
const sectionTabs = Array.from(document.querySelectorAll(".section-tab"));
const sectionTabPanels = Array.from(document.querySelectorAll(".section-tab-panel"));

const verticalIntel = {
  healthcare: {
    label: "Healthcare",
    blsIndustry: "Health care and social assistance",
    blsPrefix: "JTS620000000000000",
    pressure: "patient access, clinical capacity, revenue-cycle execution, and digital health modernization",
    hardReality: "qualified healthcare talent is often already assigned, tied to a system-specific environment, or unwilling to move without a clear schedule, rate, and clinical impact story",
    roles: "clinical systems analysts, Epic and EHR talent, revenue-cycle specialists, care operations leaders, data analysts, and healthcare IT project teams",
    proof: "compare health care hiring momentum, local wage bands, hospital demand signals, and active openings before the call",
    marketRoles: [
      {
        title: "Epic / EHR Analysts",
        why: "Commonly needed for optimization, upgrades, integrations, reporting, and go-live support.",
        angle: "Ask which clinical or revenue-cycle workflows are still creating ticket volume."
      },
      {
        title: "Revenue Cycle & Billing Talent",
        why: "Denials, coding, prior authorization, and collections pressure keep contract support relevant.",
        angle: "Lead with cash acceleration, backlog reduction, and clean handoffs between operations and IT."
      },
      {
        title: "Healthcare Data Analysts",
        why: "Quality reporting, population health, dashboards, and payer/provider analytics need domain context.",
        angle: "Ask where reporting delays are slowing decisions or reimbursement work."
      },
      {
        title: "Clinical Operations Support",
        why: "Capacity gaps show up fast in scheduling, care coordination, case management, and access teams.",
        angle: "Connect staffing directly to patient access, manager bandwidth, and service-level risk."
      }
    ],
    skills: ["Epic", "Cerner", "Revenue Cycle", "Claims", "Denials", "HL7/FHIR", "SQL", "Tableau", "Power BI", "Care Coordination"],
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
    hardReality: "the strongest IT candidates are usually heads-down on active delivery, entertaining multiple opportunities, and judging roles by stack, flexibility, manager credibility, and speed of process",
    roles: "cloud engineers, cybersecurity specialists, data engineers, application developers, ERP/CRM talent, project managers, and product teams",
    proof: "compare information and professional-services hiring, skill availability, remote/on-site constraints, and market pay movement",
    marketRoles: [
      {
        title: "Cloud & Infrastructure Engineers",
        why: "Migration, cost optimization, security hardening, and hybrid environment work often need project capacity.",
        angle: "Ask what is delayed because internal teams are split between operations and transformation."
      },
      {
        title: "Cybersecurity Specialists",
        why: "Security, identity, compliance, vulnerability management, and incident response remain high-stakes needs.",
        angle: "Lead with risk exposure and time-to-productivity for niche security skill sets."
      },
      {
        title: "Data Engineers & BI Developers",
        why: "Companies need clean pipelines, analytics layers, dashboards, and AI-ready data foundations.",
        angle: "Ask which business decisions are waiting on better data availability or reporting."
      },
      {
        title: "ERP / CRM / Business Systems Talent",
        why: "Salesforce, SAP, Workday, ServiceNow, and related platforms create recurring admin, integration, and project needs.",
        angle: "Position contract talent as a way to protect release timelines and business adoption."
      }
    ],
    skills: ["AWS", "Azure", "Cybersecurity", "IAM", "Data Engineering", "Python", "SQL", "Salesforce", "SAP", "ServiceNow", "Agile", "PMO"],
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
    hardReality: "proven finance candidates are difficult to move during close, audit, budget, and reporting cycles unless the role has clear scope, urgency, rate alignment, and a quick decision path",
    roles: "FP&A analysts, accountants, controllers, audit consultants, risk and compliance talent, finance systems analysts, and banking operations specialists",
    proof: "compare financial-activities employment, wage benchmarks, regulatory change, and accounting or finance openings by market",
    marketRoles: [
      {
        title: "FP&A Analysts",
        why: "Budgeting, forecasting, scenario modeling, and board reporting create recurring demand for analytical finance talent.",
        angle: "Ask where leadership needs faster visibility into margin, spend, or forecast variance."
      },
      {
        title: "Accountants & Senior Accountants",
        why: "Month-end close, reconciliations, audit prep, and turnover backfill are steady contract triggers.",
        angle: "Lead with close-cycle protection and the cost of overloading permanent staff."
      },
      {
        title: "Controllers & Accounting Managers",
        why: "Leadership gaps can stall process discipline, controls, reporting cadence, and team development.",
        angle: "Ask which finance processes depend on one person and where interim leadership would reduce risk."
      },
      {
        title: "Risk, Compliance & Audit Talent",
        why: "Regulatory pressure, internal controls, SOX, banking operations, and audit readiness create specialized needs.",
        angle: "Position vetted specialists as a way to meet deadlines without adding permanent overhead."
      }
    ],
    skills: ["FP&A", "Forecasting", "Month-End Close", "GAAP", "SOX", "Audit", "Risk", "Compliance", "Excel", "Power BI", "NetSuite", "Workday"],
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

const blsMeasures = [
  { code: "JOL", label: "Openings", suffix: "K", description: "job openings" },
  { code: "JOR", label: "Openings Rate", suffix: "%", description: "job openings rate" },
  { code: "HIL", label: "Hires", suffix: "K", description: "hires" },
  { code: "QUR", label: "Quits Rate", suffix: "%", description: "quits rate" }
];

const objectionPatterns = [
  {
    match: ["vendor", "approved", "list", "preferred"],
    title: "Approved vendor / vendor list",
    ask: "What is the process for adding a vendor, and when do you review vendor performance?",
    acknowledge: "That makes sense. A company with your scale usually has a defined vendor process.",
    reframe: "MMI can still be useful where current vendors are underperforming, especially on niche or hard-to-fill roles.",
    advance: "Ask for the program owner, next QBR date, or one difficult role where a niche partner could prove value."
  },
  {
    match: ["msp", "vms", "fieldglass", "beeline", "program"],
    title: "MSP / VMS program",
    ask: "Which MSP or VMS do you use, and where do managers still feel gaps in candidate quality or speed?",
    acknowledge: "Understood. Many enterprise clients use that model and need partners who respect the process.",
    reframe: "MMI works successfully inside VMS environments and can also support niche searches through approved channels.",
    advance: "Ask for the program contact, tool name, review timing, or a role that has not produced strong candidates."
  },
  {
    match: ["price", "fee", "fees", "rate", "expensive", "cost", "budget"],
    title: "Price / rate / budget concern",
    ask: "How long has the role been open, and what is the business cost of keeping it unfilled?",
    acknowledge: "I understand being cost conscious. Budget and rate discipline matter.",
    reframe: "Because MMI is contingent, the buyer can compare our candidates before paying anything, while also seeing market reality around scarce talent.",
    advance: "Ask for the target range, must-have skills, and whether a calibrated market snapshot would help reset expectations."
  },
  {
    match: ["hr", "talent acquisition", "recruiting handles", "internal"],
    title: "HR owns hiring",
    ask: "How does HR partner with you when the role requires niche skills or contractor support?",
    acknowledge: "That is completely fair. HR and Talent Acquisition should be part of the process.",
    reframe: "MMI can make HR's job easier by bringing calibrated market context and qualified talent against the manager's must-haves.",
    advance: "Ask who in HR owns the process and what requirements you should reference so outreach is useful."
  },
  {
    match: ["happy", "current vendor", "vendors", "covered", "favorite"],
    title: "Happy with current vendors",
    ask: "Where do your current vendors perform well, and where do they struggle on niche or urgent roles?",
    acknowledge: "It is good that you have partners you trust.",
    reframe: "MMI does not need to replace them to be valuable. We can be a comparison point or niche option when the current bench is not enough.",
    advance: "Ask for one hard-to-fill role, a future check-in, or permission to send a relevant market profile."
  },
  {
    match: ["bad experience", "burned", "vendor issue", "poor vendor", "bad vendor"],
    title: "Bad vendor experience",
    ask: "What specifically happened, and what would a better partner need to do differently?",
    acknowledge: "I can understand why that would make you cautious.",
    reframe: "The only useful response is to solve the service failure directly: communication, calibration, candidate quality, speed, or follow-through.",
    advance: "Ask for the hardest current pain point and offer a low-risk calibration conversation before asking for a requisition."
  },
  {
    match: ["diverse", "diversity", "minority", "wmbe", "women owned", "supplier"],
    title: "Diverse supplier requirement",
    ask: "Is the requirement for all staffing partners, or are niche partners allowed through approved diversity channels?",
    acknowledge: "That priority makes sense and is important to respect.",
    reframe: "MMI can often support through Dale Workforce Solutions or approved diversity partner paths.",
    advance: "Ask whether an introduction to Dale Workforce Solutions would be helpful."
  },
  {
    match: ["busy", "no time", "send email", "send information", "send info"],
    title: "Too busy / send information",
    ask: "What information would actually be useful enough to make the follow-up worth your time?",
    acknowledge: "I know your calendar is packed, and I do not want to send generic material.",
    reframe: "A short conversation lets MMI tailor the information to the roles, teams, or market pressures that matter to you.",
    advance: "Ask for 10 minutes, a preferred time window, and permission to send one relevant note before the meeting."
  },
  {
    match: ["no needs", "not hiring", "nothing open", "no openings"],
    title: "No current needs",
    ask: "Is that because roles were recently filled, or is hiring likely to pick up later in the quarter or year?",
    acknowledge: "No problem. Timing matters.",
    reframe: "The best time to learn the team is before the need becomes urgent, so MMI can respond faster when something changes.",
    advance: "Ask for a future check-in date, upcoming initiatives, or another team that may have a hiring need."
  }
];

const pageResources = {
  home: {
    title: "MMI Playbook Resources",
    items: [
      { label: "Start with Foundation", type: "link", href: "#foundation" },
      { label: "Open Pitching MMI", type: "link", href: "#pitch" },
      { label: "Sales lifecycle map", type: "link", href: "#lifecycle" },
      { label: "Open resource library", type: "page", href: "resources.html" }
    ]
  },
  foundation: {
    title: "MMI Foundation Resources",
    items: [
      { label: "Company story notes", type: "file", href: "resources/MMI-Foundation-Notes.docx", filename: "MMI-Foundation-Notes.docx" },
      { label: "Go to Pitching MMI", type: "link", href: "#pitch" }
    ]
  },
  pitch: {
    title: "MMI Pitch Resources",
    items: [
      { label: "Download pitch talk tracks", type: "file", href: "resources/MMI-Pitch-Talk-Tracks.docx", filename: "MMI-Pitch-Talk-Tracks.docx" },
      { label: "Download proof points", type: "file", href: "resources/MMI-Proof-of-Partnerships.docx", filename: "MMI-Proof-of-Partnerships.docx" },
      { label: "Market intelligence support", type: "link", href: "#market-intel" }
    ]
  },
  lifecycle: {
    title: "MMI Lifecycle Resources",
    items: [
      { label: "Download lifecycle checklist", type: "file", href: "resources/MMI-Sales-Lifecycle-Checklist.docx", filename: "MMI-Sales-Lifecycle-Checklist.docx" },
      { label: "Calls and meetings", type: "link", href: "#meetings" }
    ]
  },
  prospecting: {
    title: "MMI Prospecting Resources",
    items: [
      { label: "Add to Apollo", type: "external", href: "https://app.apollo.io/#sequences/69dd389c707c2f0019342ecd" },
      { label: "Download prospecting prompts", type: "file", href: "resources/MMI-Prospecting-Prompts.docx", filename: "MMI-Prospecting-Prompts.docx" },
      { label: "Buyer strategy", type: "link", href: "#strategy" }
    ]
  },
  "market-intel": {
    title: "MMI Market Intel Resources",
    items: [
      { label: "Use market intel workbench", type: "link", href: "#market-intel" },
      { label: "Download call prep prompts", type: "file", href: "resources/MMI-Market-Intel-Call-Prep.docx", filename: "MMI-Market-Intel-Call-Prep.docx" }
    ]
  },
  strategy: {
    title: "MMI Buyer Strategy Resources",
    items: [
      { label: "Download buyer questions", type: "file", href: "resources/MMI-Buyer-Strategy-Questions.docx", filename: "MMI-Buyer-Strategy-Questions.docx" },
      { label: "Meeting prep", type: "link", href: "#meetings" }
    ]
  },
  networking: {
    title: "MMI Networking Resources",
    items: [
      { label: "Download referral prompts", type: "file", href: "resources/MMI-Networking-Referral-Prompts.docx", filename: "MMI-Networking-Referral-Prompts.docx" },
      { label: "Prospecting plays", type: "link", href: "#prospecting" }
    ]
  },
  meetings: {
    title: "MMI Meeting Resources",
    items: [
      { label: "Download job order worksheet", type: "file", href: "resources/MMI-Job-Order-Worksheet.docx", filename: "MMI-Job-Order-Worksheet.docx" },
      { label: "Download job ranking parameters", type: "file", href: "resources/Job-Ranking-Parameters.docx", filename: "Job-Ranking-Parameters.docx" },
      { label: "Download CORP question bank", type: "file", href: "resources/MMI-CORP-Question-Bank.docx", filename: "MMI-CORP-Question-Bank.docx" },
      { label: "Download objection guide", type: "file", href: "resources/MMI-Objection-Handling-Guide.docx", filename: "MMI-Objection-Handling-Guide.docx" },
      { label: "Submit job ranking form", type: "external", href: "https://forms.office.com/Pages/ResponsePage.aspx?id=UyJJf0101UWB-lz_kTRGhlVXVSVKHc5IqU8Zu8EpLbdUQTlLT1lUUEJQTlUxSDQ0TFI0T0dWVVI5Ry4u" },
      { label: "Download meeting checklist", type: "file", href: "resources/MMI-Meeting-Checklist.docx", filename: "MMI-Meeting-Checklist.docx" },
      { label: "Prep, debrief, close", type: "link", href: "#close" }
    ]
  },
  close: {
    title: "MMI Close Resources",
    items: [
      { label: "Download submittal template", type: "file", href: "resources/Submittal-Template-2026.docx", filename: "Submittal-Template-2026.docx" },
      { label: "Download closeout checklist", type: "file", href: "resources/MMI-Closeout-Checklist.docx", filename: "MMI-Closeout-Checklist.docx" },
      { label: "First deal path", type: "link", href: "#first-deal" }
    ]
  },
  technology: {
    title: "MMI Tech SOP Resources",
    items: [
      { label: "Download tech usage checklist", type: "file", href: "resources/MMI-Tech-SOP-Checklist.docx", filename: "MMI-Tech-SOP-Checklist.docx" },
      { label: "Market intelligence", type: "link", href: "#market-intel" }
    ]
  },
  "first-deal": {
    title: "MMI First Deal Resources",
    items: [
      { label: "Download first deal checklist", type: "file", href: "resources/MMI-First-Deal-Checklist.docx", filename: "MMI-First-Deal-Checklist.docx" },
      { label: "Review sales lifecycle", type: "link", href: "#lifecycle" }
    ]
  }
};

let currentBlsData = [];
let pageHistory = [];
let currentPageId = "home";
let activeSearchTerms = [];

const sectionIndex = sections.map((section) => ({
  id: section.id,
  title: section.dataset.title || section.querySelector("h2")?.textContent || section.id,
  text: `${section.dataset.search || ""} ${section.textContent || ""}`.replace(/\s+/g, " ").trim()
}));

searchInput.addEventListener("input", handleSearch);
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", updatePageState, { passive: true });
window.addEventListener("resize", updateStickyMetrics);
pageLinks.forEach((link) => {
  link.addEventListener("click", handleAnchorClick);
});
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
backPage?.addEventListener("click", goBackPage);
homePage?.addEventListener("click", () => showPage("home"));
meetingTiles.forEach((tile) => {
  tile.addEventListener("click", () => setMeetingPanel(tile.dataset.meetingTarget));
});
callStepButtons.forEach((button) => {
  button.addEventListener("click", () => setCallStep(button.dataset.callStepTarget));
});
objectionForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  generateObjectionResponse();
});
sectionTabs.forEach((tab) => {
  tab.addEventListener("click", () => setSectionTab(tab.dataset.tabTarget));
});
updateStickyMetrics();
showPage(getInitialPageId(), false);
updatePageState();
generateIntel();
fetchBlsData();

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = "";
  activeSearchTerms = query.split(/\s+/).filter(Boolean);

  if (!query) {
    searchResults.classList.remove("active");
    clearHighlights();
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
    link.addEventListener("click", (event) => {
      event.preventDefault();
      searchResults.classList.remove("active");
      searchInput.value = "";
      showPage(match.id, true, terms);
    });
    searchResults.append(link);
  });
}

function handleAnchorClick(event) {
  const id = event.currentTarget.getAttribute("href")?.slice(1);
  if (!id) return;

  event.preventDefault();
  searchResults.classList.remove("active");
  searchInput.value = "";
  showPage(id);
}

function showPage(id, updateHash = true, highlightTerms = []) {
  const target = document.getElementById(id);
  if (!target) return;

  if (currentPageId && currentPageId !== id && updateHash) {
    pageHistory.push(currentPageId);
  }

  clearHighlights();
  sections.forEach((section) => {
    section.hidden = section.id !== id;
  });
  currentPageId = id;

  updateStickyMetrics();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (updateHash) {
    history.pushState(null, "", `#${id}`);
  }

  if (highlightTerms.length) {
    window.requestAnimationFrame(() => highlightMatches(target, highlightTerms));
  }

  updatePageState(id);
  renderResources(id);
}

function goBackPage() {
  const previous = pageHistory.pop();
  showPage(previous || "home", Boolean(previous));
}

function clearHighlights() {
  document.querySelectorAll("mark.search-highlight").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
}

function highlightMatches(section, terms) {
  const cleanTerms = [...new Set(terms.map((term) => term.trim()).filter((term) => term.length > 1))];
  if (!cleanTerms.length) return;

  const pattern = new RegExp(`(${cleanTerms.map(escapeRegExp).join("|")})`, "gi");
  const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, mark")) return NodeFilter.FILTER_REJECT;
      pattern.lastIndex = 0;
      return pattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    pattern.lastIndex = 0;
    node.nodeValue.split(pattern).forEach((part) => {
      if (!part) return;
      if (cleanTerms.some((term) => part.toLowerCase() === term.toLowerCase())) {
        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = part;
        fragment.append(mark);
      } else {
        fragment.append(document.createTextNode(part));
      }
    });
    node.replaceWith(fragment);
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getStickyOffset() {
  const headerHeight = topbar?.offsetHeight || 0;
  const searchHeight = searchBand?.offsetHeight || 0;
  return headerHeight + searchHeight + 18;
}

function updateStickyMetrics() {
  const root = document.documentElement;
  const headerHeight = topbar?.offsetHeight || 0;
  const searchHeight = searchBand?.offsetHeight || 0;

  root.style.setProperty("--topbar-height", `${headerHeight}px`);
  root.style.setProperty("--search-height", `${searchHeight}px`);
}

function updatePageState(currentId = currentPageId || getVisiblePageId()) {
  if (typeof currentId !== "string") {
    currentId = currentPageId || getVisiblePageId();
  }

  updateStickyMetrics();
  document.body.dataset.activePage = currentId;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  backTop.classList.remove("visible");
  document.body.classList.remove("search-compact");
  renderResources(currentId);
}

function renderResources(id) {
  if (!resourceTitle || !resourceList) return;

  const visibleId = sections.find((section) => !section.hidden)?.id;
  const resourceId = pageResources[id] ? id : visibleId;
  const section = sections.find((item) => item.id === resourceId || item.id === id);
  const fallbackTitle = section?.dataset.title ? `MMI ${section.dataset.title} Resources` : "MMI Playbook Resources";
  const resources = pageResources[resourceId] || {
    title: fallbackTitle,
    items: [
      { label: "Return home", type: "link", href: "#home" },
      { label: "Open Pitching MMI", type: "link", href: "#pitch" }
    ]
  };

  resourceTitle.textContent = resources.title;
  resourceList.innerHTML = "";

  resources.items.forEach((item) => {
    resourceList.append(createResourceAnchor(item, "resource-link"));
  });
}

function createResourceAnchor(item, className) {
  const link = document.createElement("a");
  const resourceKind = item.type === "download" || item.type === "file" ? "download" : "standard";
  link.className = `${className} ${resourceKind}`;
  link.textContent = item.label;

  if (item.type === "download") {
    const blob = new Blob([item.content], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
    link.download = item.filename;
  } else if (item.type === "file") {
    link.href = item.href;
    link.download = item.filename || "";
  } else if (item.type === "external") {
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else if (item.type === "page") {
    link.href = item.href;
  } else {
    link.href = item.href;
    link.addEventListener("click", handleAnchorClick);
  }

  return link;
}

function setMeetingPanel(targetId) {
  if (!targetId) return;

  meetingTiles.forEach((tile) => {
    const isActive = tile.dataset.meetingTarget === targetId;
    tile.classList.toggle("active", isActive);
    tile.setAttribute("aria-expanded", String(isActive));
  });

  meetingPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

function setCallStep(targetId) {
  if (!targetId) return;

  callStepButtons.forEach((button) => {
    const isActive = button.dataset.callStepTarget === targetId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  callStepPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

function generateObjectionResponse() {
  if (!objectionInput || !objectionResponse) return;

  const raw = objectionInput.value.trim();
  if (!raw) {
    objectionResponse.innerHTML = "<p>Enter an objection to build a response.</p>";
    return;
  }

  const normalized = raw.toLowerCase();
  const pattern = objectionPatterns.find((item) => item.match.some((term) => normalized.includes(term))) || {
    title: "General objection",
    ask: "Can you help me understand what is driving that concern?",
    acknowledge: "I appreciate you being direct. That is a fair concern to raise.",
    reframe: "The goal is not to force a fit. It is to see whether MMI can solve a real gap around speed, quality, niche reach, risk, or process.",
    advance: "Ask for one next step that lowers commitment: a follow-up date, one role to benchmark, a stakeholder name, or permission to send targeted context."
  };

  objectionResponse.innerHTML = `
    <div class="objection-response-heading">
      <span>Matched angle</span>
      <h4>${escapeHtml(pattern.title)}</h4>
    </div>
    <div class="objection-response-grid">
      <article><b>Ask</b><p>${escapeHtml(pattern.ask)}</p></article>
      <article><b>Acknowledge</b><p>${escapeHtml(pattern.acknowledge)}</p></article>
      <article><b>Reframe</b><p>${escapeHtml(pattern.reframe)}</p></article>
      <article><b>Advance</b><p>${escapeHtml(pattern.advance)}</p></article>
    </div>
    <div class="objection-response-script">
      <b>Talk track</b>
      <p>${escapeHtml(pattern.acknowledge)} ${escapeHtml(pattern.ask)} ${escapeHtml(pattern.reframe)} ${escapeHtml(pattern.advance)}</p>
    </div>
  `;
}

function setSectionTab(targetId) {
  if (!targetId) return;

  const targetPanel = document.getElementById(targetId);
  if (!targetPanel) return;

  const relatedTabs = sectionTabs.filter((tab) => {
    const panel = document.getElementById(tab.dataset.tabTarget);
    return panel?.parentElement === targetPanel.parentElement;
  });

  const relatedPanels = sectionTabPanels.filter((panel) => panel.parentElement === targetPanel.parentElement);

  relatedTabs.forEach((tab) => {
    const isActive = tab.dataset.tabTarget === targetId;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  relatedPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

function getVisiblePageId() {
  return sections.find((section) => !section.hidden)?.id || currentPageId || "home";
}

function getInitialPageId() {
  const hashId = window.location.hash.slice(1);
  return sections.some((section) => section.id === hashId) ? hashId : "home";
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
  const roleDemand = getRoleDemandSummary(vertical, role);

  intelHeadline.textContent = `${vertical.label} staffing brief for ${region}`;
  intelNarrative.textContent = `${vertical.label} buyers are balancing ${vertical.pressure}. For ${role}, lead with a ${signal} point of view: ${signalIntel[signal]} ${buyer}`;
  intelTalkTrack.textContent = `${roleDemand} The hard part is not finding names; it is finding available people who match the environment, rate, timeline, and manager expectations. ${capitalizeSentence(vertical.hardReality)}.`;
  intelOutreach.textContent = `I am seeing demand for ${role} in ${region}, but the candidate pool is tight. The strongest people are moving quickly and usually need a clear role story, fast interview path, and realistic rate. Open to comparing what you are seeing against the market?`;

  renderList(intelQuestions, [
    ...vertical.questions,
    `What would a credible ${region} market snapshot need to show before you would adjust process, pay, or supplier coverage?`
  ]);
  renderMetrics(currentBlsData);
  renderMarketRoles(vertical.marketRoles);
  renderSkillSignals(vertical.skills);
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
    "",
    "Common roles in market:",
    ...formatMarketRoleLines(),
    "",
    "Skill signals to search:",
    `- ${verticalIntel[intelVertical.value].skills.join(", ")}`,
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

function renderMarketRoles(roles) {
  if (!intelRoles) return;
  intelRoles.innerHTML = "";

  roles.forEach((role) => {
    const item = document.createElement("article");
    item.className = "role-market-card";
    item.innerHTML = `
      <b>${escapeHtml(role.title)}</b>
      <span>${escapeHtml(role.why)}</span>
      <small>${escapeHtml(role.angle)}</small>
    `;
    intelRoles.append(item);
  });
}

function renderSkillSignals(skills) {
  if (!intelSkills) return;
  intelSkills.innerHTML = "";

  skills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.textContent = skill;
    intelSkills.append(chip);
  });
}

function formatMetricValue(item) {
  return item.suffix === "%" ? `${item.value}%` : `${Number(item.value).toLocaleString()}${item.suffix}`;
}

function formatBlsLines() {
  if (!currentBlsData.length) return ["- BLS data not pulled yet."];
  return currentBlsData.map((item) => `- BLS ${item.description}: ${formatMetricValue(item)} for ${item.period}${item.preliminary ? " (preliminary)" : ""}. Series: ${item.id}.`);
}

function formatMarketRoleLines() {
  return verticalIntel[intelVertical.value].marketRoles.map((role) => `- ${role.title}: ${role.why} Sales angle: ${role.angle}`);
}

function getRoleDemandSummary(vertical, role) {
  const normalizedRole = role.toLowerCase();
  const matchedRole = vertical.marketRoles.find((item) => normalizedRole.includes(item.title.toLowerCase().split(" ")[0]));
  const roleLabel = matchedRole?.title || role;
  const roleReason = matchedRole?.why || `Demand is showing up around ${role} because teams need proven capacity without waiting on a long permanent hiring cycle.`;

  return `${roleLabel} is a practical demand signal. ${roleReason}`;
}

function capitalizeSentence(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
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
    "Common roles and skill signals:",
    ...formatMarketRoleLines(),
    `- Skills/keywords to validate in LinkedIn, Apollo, JobDiva, and postings: ${vertical.skills.join(", ")}`,
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
