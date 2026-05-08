const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const sections = Array.from(document.querySelectorAll(".playbook-section"));
const navLinks = Array.from(document.querySelectorAll(".sidenav a"));
const backTop = document.querySelector("#backTop");

const sectionIndex = sections.map((section) => ({
  id: section.id,
  title: section.dataset.title || section.querySelector("h2")?.textContent || section.id,
  text: `${section.dataset.search || ""} ${section.textContent || ""}`.replace(/\s+/g, " ").trim()
}));

searchInput.addEventListener("input", handleSearch);
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", updatePageState, { passive: true });
updatePageState();

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
