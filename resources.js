const resourceSearchInput = document.querySelector("#resourceSearchInput");
const resourceLibrary = document.querySelector("#resourceLibrary");
const resourceLibraryStatus = document.querySelector("#resourceLibraryStatus");
const resourceBack = document.querySelector("#resourceBack");
const topbar = document.querySelector(".topbar");
const pageResources = window.playbookResources || {};

resourceSearchInput?.addEventListener("input", () => renderResourceLibrary(resourceSearchInput.value));
resourceBack?.addEventListener("click", goBack);
window.addEventListener("resize", updateTopbarMetric);
updateTopbarMetric();
renderResourceLibrary();

function updateTopbarMetric() {
  document.documentElement.style.setProperty("--topbar-height", `${topbar?.offsetHeight || 82}px`);
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "index.html#home";
}

function renderResourceLibrary(query = "") {
  if (!resourceLibrary) return;

  const normalized = query.trim().toLowerCase();
  const topicEntries = Object.entries(pageResources)
    .filter(([id]) => id !== "home")
    .map(([id, resourceGroup]) => {
      const topic = getTopicLabel(id, resourceGroup.title);
      const items = resourceGroup.items.filter((item) => {
        const searchable = [
          topic,
          resourceGroup.title,
          item.label,
          item.type,
          item.filename,
          item.href,
          item.content
        ].filter(Boolean).join(" ").toLowerCase();
        return !normalized || searchable.includes(normalized);
      });

      return { id, topic, title: resourceGroup.title, items };
    })
    .filter((entry) => entry.items.length);

  resourceLibrary.innerHTML = "";

  if (resourceLibraryStatus) {
    const count = topicEntries.reduce((total, entry) => total + entry.items.length, 0);
    resourceLibraryStatus.textContent = normalized
      ? `${count} resource${count === 1 ? "" : "s"} found across ${topicEntries.length} topic${topicEntries.length === 1 ? "" : "s"}.`
      : `${count} resources organized by ${topicEntries.length} topics.`;
  }

  if (!topicEntries.length) {
    resourceLibrary.innerHTML = '<p class="empty-state">No resources match that search yet.</p>';
    return;
  }

  topicEntries.forEach((entry) => {
    const group = document.createElement("article");
    group.className = "resource-topic";

    const heading = document.createElement("div");
    heading.className = "resource-topic-heading";
    heading.innerHTML = `<span>${escapeHtml(entry.topic)}</span><h3>${escapeHtml(entry.title)}</h3>`;

    const list = document.createElement("div");
    list.className = "resource-topic-list";
    entry.items.forEach((item) => {
      list.append(createResourceAnchor(item));
    });

    group.append(heading, list);
    resourceLibrary.append(group);
  });
}

function createResourceAnchor(item) {
  const link = document.createElement("a");
  const resourceKind = item.type === "download" || item.type === "file" ? "download" : "standard";
  link.className = `resource-card ${resourceKind}`;
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
  } else {
    link.href = item.href;
  }

  return link;
}

function getTopicLabel(id, title) {
  const labels = {
    foundation: "Foundation",
    pitch: "Pitching MMI",
    lifecycle: "Sales Lifecycle",
    prospecting: "Prospecting",
    "market-intel": "Market Intelligence",
    strategy: "Buyer Strategy",
    networking: "Networking",
    meetings: "Calls & Meetings",
    close: "Prep, Debrief, Close",
    technology: "Technology SOP",
    "first-deal": "First Deal"
  };

  return labels[id] || title.replace(/^MMI\s+|\s+Resources$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
