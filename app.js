// NoteCraft Studio - Core Application Logic

let currentNote = {
  id: "note-" + Date.now(),
  title: "Binary Number System",
  subtitle: "Digital Electronics • Stylish Revision Notes",
  tag: "Computer Science",
  theme: "pastel",
  font: "sans",
  paper: "dots",
  layout: "standard",
  colorAccent: "#6366f1",
  content: PRESET_NOTES.binary.content,
  updatedAt: new Date().toISOString()
};

let savedNotes = [];
let renderTimeout = null;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadSavedNotes();
  initLucide();
  setupEventListeners();
  loadNote(currentNote);
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Load notes from LocalStorage
function loadSavedNotes() {
  try {
    const raw = localStorage.getItem("notecraft_saved_notes");
    if (raw) {
      savedNotes = JSON.parse(raw);
    } else {
      // Initialize with preset notes
      savedNotes = Object.values(PRESET_NOTES);
      saveNotesToStorage();
    }
    renderNotesList();
  } catch (e) {
    console.error("Failed to load notes:", e);
    savedNotes = Object.values(PRESET_NOTES);
  }
}

function saveNotesToStorage() {
  try {
    localStorage.setItem("notecraft_saved_notes", JSON.stringify(savedNotes));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  const editor = document.getElementById("markdown-editor");
  const noteTitleInput = document.getElementById("note-title-input");
  const noteSubtitleInput = document.getElementById("note-subtitle-input");
  const noteTagInput = document.getElementById("note-tag-input");

  // Live typing debounce
  editor.addEventListener("input", () => {
    currentNote.content = editor.value;
    currentNote.updatedAt = new Date().toISOString();
    debouncedRender();
    updateStats();
    saveCurrentNoteState();
  });

  noteTitleInput.addEventListener("input", (e) => {
    currentNote.title = e.target.value;
    updateHeaderPreview();
    saveCurrentNoteState();
  });

  noteSubtitleInput.addEventListener("input", (e) => {
    currentNote.subtitle = e.target.value;
    updateHeaderPreview();
    saveCurrentNoteState();
  });

  noteTagInput.addEventListener("input", (e) => {
    currentNote.tag = e.target.value;
    updateHeaderPreview();
    saveCurrentNoteState();
  });

  // Theme selector
  document.getElementById("theme-select").addEventListener("change", (e) => {
    setTheme(e.target.value);
  });

  // Font selector
  document.getElementById("font-select").addEventListener("change", (e) => {
    setFont(e.target.value);
  });

  // Paper selector
  document.getElementById("paper-select").addEventListener("change", (e) => {
    setPaper(e.target.value);
  });

  // Layout selector
  document.getElementById("layout-select").addEventListener("change", (e) => {
    setLayout(e.target.value);
  });

  // Color Accent picker
  const accentPicker = document.getElementById("accent-picker");
  accentPicker.addEventListener("input", (e) => {
    setColorAccent(e.target.value);
  });
}

function debouncedRender() {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => {
    renderNotePreview();
  }, 40);
}

// Render Markdown to Stylish HTML
function renderNotePreview() {
  const container = document.getElementById("note-content-render");
  if (!container) return;

  const raw = currentNote.content || "";
  let processed = raw;

  // 1. Pre-process Custom Callouts
  processed = processCallouts(processed);

  // 2. Pre-process Interactive Practice Cards
  processed = processPracticeCards(processed);

  // 3. Pre-process Fluorescent Highlighters
  processed = processHighlighters(processed);

  // 4. Pre-process KaTeX Math ($...$ and $$...$$)
  const mathStore = [];
  processed = protectAndExtractMath(processed, mathStore);

  // 5. Parse Markdown with marked.js
  let html = "";
  if (window.marked) {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
    html = marked.parse(processed);
  } else {
    // Basic fallback parser if marked fails to load
    html = raw.replace(/\n/g, "<br>");
  }

  // 6. Restore Math and render with KaTeX
  html = restoreAndRenderMath(html, mathStore);

  // 7. Inject into container
  container.innerHTML = html;

  // 8. Cornell Layout Processing if enabled
  if (currentNote.layout === "cornell") {
    applyCornellFormatting(container);
  }

  // Re-init practice accordion events & Lucide icons
  attachAccordionEvents(container);
  initLucide();
}

// Custom Callouts Parser
function processCallouts(text) {
  // Regex matching blockquotes like > [!KEY] ... or > [!TIP]
  const calloutRegex = /^>\s*\[!(KEY|TIP|WARN|TRICK|NOTE)\]\s*([^\n]*)\n((?:^>.*\n?)*)/gim;

  return text.replace(calloutRegex, (match, type, title, body) => {
    const cleanType = type.toUpperCase();
    const cleanTitle = (title && title.trim()) ? title.trim() : getDefaultCalloutTitle(cleanType);
    const cleanBody = body.replace(/^>\s?/gm, "").trim();

    const iconMap = {
      KEY: "key-round",
      TIP: "lightbulb",
      WARN: "alert-triangle",
      TRICK: "sparkles",
      NOTE: "info"
    };

    const icon = iconMap[cleanType] || "info";
    const typeClass = `callout-${cleanType.toLowerCase()}`;

    return `<div class="callout-box ${typeClass}">
      <div class="callout-header">
        <i data-lucide="${icon}" class="w-4 h-4"></i>
        <span>${cleanTitle}</span>
      </div>
      <div class="callout-body">
        ${cleanBody}
      </div>
    </div>\n\n`;
  });
}

function getDefaultCalloutTitle(type) {
  switch (type) {
    case "KEY": return "Key Concept";
    case "TIP": return "Pro Tip";
    case "WARN": return "Important Warning";
    case "TRICK": return "Memory Trick";
    case "NOTE": return "Note";
    default: return "Info";
  }
}

// Practice Question Cards Parser: :::practice Question? || Answer :::
function processPracticeCards(text) {
  const practiceRegex = /:::practice\s*([\s\S]*?)\|\|([\s\S]*?):::/g;
  return text.replace(practiceRegex, (match, question, answer) => {
    return `<div class="practice-card">
      <div class="practice-question">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">?</span>
          <span>${question.trim()}</span>
        </div>
        <i data-lucide="chevron-down" class="w-4 h-4 practice-icon transition-transform duration-200"></i>
      </div>
      <div class="practice-answer">
        <strong>💡 Solution:</strong> ${answer.trim()}
      </div>
    </div>\n\n`;
  });
}

// Highlighters: ==yellow text==, ==mint text==, ==lavender text==, ==text==
function processHighlighters(text) {
  return text.replace(/==([a-z]+)?\s*([\s\S]*?)==/gi, (match, color, content) => {
    let colorClass = "hl-yellow";
    if (color && ["yellow", "mint", "lavender", "coral"].includes(color.toLowerCase())) {
      colorClass = `hl-${color.toLowerCase()}`;
    } else if (color) {
      content = color + " " + content;
    }
    return `<mark class="${colorClass}">${content}</mark>`;
  });
}

// Protect math expressions during markdown parsing
function protectAndExtractMath(text, store) {
  // 1. Block math: $$ ... $$
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    const id = `%%MATH_BLOCK_${store.length}%%`;
    store.push({ id, math: math.trim(), isBlock: true });
    return id;
  });

  // 2. Inline math: $ ... $ (avoiding currency like $5)
  text = text.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    const id = `%%MATH_INLINE_${store.length}%%`;
    store.push({ id, math: math.trim(), isBlock: false });
    return id;
  });

  return text;
}

// Restore & Render KaTeX Math
function restoreAndRenderMath(html, store) {
  store.forEach(item => {
    let rendered = item.math;
    if (window.katex) {
      try {
        rendered = katex.renderToString(item.math, {
          displayMode: item.isBlock,
          throwOnError: false
        });
      } catch (e) {
        rendered = `<span class="text-rose-500 font-mono text-xs">[Math Error]</span>`;
      }
    } else {
      rendered = item.isBlock ? `<div class="font-mono my-2 text-center">${item.math}</div>` : `<code>${item.math}</code>`;
    }
    html = html.replace(item.id, rendered);
  });
  return html;
}

// Cornell Format organizer
function applyCornellFormatting(container) {
  const headings = container.querySelectorAll("h2");
  if (headings.length === 0) return;

  const cornellWrapper = document.createElement("div");
  cornellWrapper.className = "layout-cornell";

  const cueCol = document.createElement("div");
  cueCol.className = "cornell-cue-column";

  const notesCol = document.createElement("div");
  notesCol.className = "cornell-notes-column";

  // Build cues list
  let cuesHtml = `<div class="font-bold uppercase tracking-wider text-xs mb-3 text-indigo-500">Key Cues & Questions</div><ul class="space-y-3">`;
  headings.forEach(h => {
    cuesHtml += `<li><strong>•</strong> ${h.innerText}</li>`;
  });
  cuesHtml += `</ul>`;
  cueCol.innerHTML = cuesHtml;

  // Move container children into notesCol
  while (container.firstChild) {
    notesCol.appendChild(container.firstChild);
  }

  cornellWrapper.appendChild(cueCol);
  cornellWrapper.appendChild(notesCol);
  container.appendChild(cornellWrapper);
}

// Accordion Click Handlers
function attachAccordionEvents(container) {
  const cards = container.querySelectorAll(".practice-card");
  cards.forEach(card => {
    const header = card.querySelector(".practice-question");
    if (header) {
      header.onclick = () => {
        card.classList.toggle("open");
        initLucide();
      };
    }
  });
}

// Load Note into UI
function loadNote(note) {
  currentNote = { ...note };
  document.getElementById("markdown-editor").value = note.content || "";
  document.getElementById("note-title-input").value = note.title || "";
  document.getElementById("note-subtitle-input").value = note.subtitle || "";
  document.getElementById("note-tag-input").value = note.tag || "";
  
  document.getElementById("theme-select").value = note.theme || "pastel";
  document.getElementById("font-select").value = note.font || "sans";
  document.getElementById("paper-select").value = note.paper || "dots";
  document.getElementById("layout-select").value = note.layout || "standard";
  document.getElementById("accent-picker").value = note.colorAccent || "#6366f1";

  setTheme(note.theme || "pastel");
  setFont(note.font || "sans");
  setPaper(note.paper || "dots");
  setLayout(note.layout || "standard");
  setColorAccent(note.colorAccent || "#6366f1");

  updateHeaderPreview();
  renderNotePreview();
  updateStats();
}

function updateHeaderPreview() {
  const headerContainer = document.getElementById("preview-header");
  if (!headerContainer) return;

  const dateStr = new Date(currentNote.updatedAt || Date.now()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  document.getElementById("preview-display-title").innerText = currentNote.title || "Untitled Note";
  document.getElementById("preview-display-subtitle").innerText = currentNote.subtitle || "Revision Guide";
  document.getElementById("preview-display-tag").innerText = currentNote.tag || "General";
  document.getElementById("preview-display-date").innerText = dateStr;
}

// Set Theme
function setTheme(theme) {
  currentNote.theme = theme;
  const canvas = document.getElementById("note-canvas-element");
  canvas.className = canvas.className.replace(/theme-\w+/g, "");
  canvas.classList.add(`theme-${theme}`);
}

// Set Font
function setFont(font) {
  currentNote.font = font;
  const canvas = document.getElementById("note-canvas-element");
  canvas.className = canvas.className.replace(/font-\w+-mode/g, "");
  canvas.classList.add(`font-${font}-mode`);
}

// Set Paper Pattern
function setPaper(paper) {
  currentNote.paper = paper;
  const canvas = document.getElementById("note-canvas-element");
  canvas.className = canvas.className.replace(/paper-\w+/g, "");
  canvas.classList.add(`paper-${paper}`);
}

// Set Layout
function setLayout(layout) {
  currentNote.layout = layout;
  renderNotePreview();
}

// Set Color Accent
function setColorAccent(color) {
  currentNote.colorAccent = color;
  document.documentElement.style.setProperty("--primary-accent", color);
  const badge = document.getElementById("preview-display-tag");
  if (badge) badge.style.backgroundColor = `${color}20`;
  if (badge) badge.style.color = color;
}

// Save Current Note in storage
function saveCurrentNoteState() {
  const idx = savedNotes.findIndex(n => n.id === currentNote.id);
  if (idx !== -1) {
    savedNotes[idx] = { ...currentNote };
  } else {
    savedNotes.unshift({ ...currentNote });
  }
  saveNotesToStorage();
}

// Textarea Stats
function updateStats() {
  const text = currentNote.content || "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTime = Math.ceil(words / 200) || 1;

  document.getElementById("stat-words").innerText = `${words} words`;
  document.getElementById("stat-readtime").innerText = `${readTime} min read`;
}

// Toolbar Insert Block Helpers
function insertBlock(type) {
  const editor = document.getElementById("markdown-editor");
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const text = editor.value;

  let snippet = "";
  switch (type) {
    case "key":
      snippet = `\n> [!KEY] Key Takeaway\n> Core principle or critical rule here.\n\n`;
      break;
    case "tip":
      snippet = `\n> [!TIP] Pro Tip\n> Helpful technique or study shortcut.\n\n`;
      break;
    case "warn":
      snippet = `\n> [!WARN] Common Pitfall\n> Watch out for this frequent examination mistake!\n\n`;
      break;
    case "trick":
      snippet = `\n> [!TRICK] Memory Trick\n> Catchy mnemonic to remember this easily.\n\n`;
      break;
    case "table":
      snippet = `\n| Item | Property A | Property B | Notes |\n| :--- | :--- | :--- | :--- |\n| **Alpha** | Value 1 | Value 2 | Standard |\n| **Beta** | Value 3 | Value 4 | Accelerated |\n\n`;
      break;
    case "math":
      snippet = `\n$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$\n\n`;
      break;
    case "practice":
      snippet = `\n:::practice Question to solve? || Step-by-step verified solution. :::\n\n`;
      break;
    case "checklist":
      snippet = `\n- [ ] First key milestone\n- [ ] Second verification step\n- [ ] Review final summary\n\n`;
      break;
    case "hl-yellow":
      snippet = ` ==yellow highlighted text== `;
      break;
    case "hl-mint":
      snippet = ` ==mint highlighted text== `;
      break;
    case "hl-lavender":
      snippet = ` ==lavender highlighted text== `;
      break;
    default:
      break;
  }

  editor.value = text.substring(0, start) + snippet + text.substring(end);
  editor.focus();
  editor.selectionStart = editor.selectionEnd = start + snippet.length;

  currentNote.content = editor.value;
  debouncedRender();
  updateStats();
  saveCurrentNoteState();
}

// View Mode Toggle (Split / Zen Preview / Editor Only)
function setViewMode(mode) {
  const editorCol = document.getElementById("editor-column");
  const previewCol = document.getElementById("preview-column");
  const splitBtn = document.getElementById("btn-view-split");
  const previewBtn = document.getElementById("btn-view-preview");
  const editorBtn = document.getElementById("btn-view-editor");

  [splitBtn, previewBtn, editorBtn].forEach(b => b && b.classList.remove("bg-indigo-600", "text-white"));

  if (mode === "split") {
    editorCol.classList.remove("hidden");
    previewCol.classList.remove("hidden");
    splitBtn.classList.add("bg-indigo-600", "text-white");
  } else if (mode === "preview") {
    editorCol.classList.add("hidden");
    previewCol.classList.remove("hidden");
    previewBtn.classList.add("bg-indigo-600", "text-white");
  } else if (mode === "editor") {
    editorCol.classList.remove("hidden");
    previewCol.classList.add("hidden");
    editorBtn.classList.add("bg-indigo-600", "text-white");
  }
}

// ============================================================================
// EXPORT CAPABILITIES
// ============================================================================

// 1. Export as PDF / Print
function exportPdf() {
  window.print();
}

// 2. Export as High-Resolution PNG Image
async function exportImage() {
  const canvasElement = document.getElementById("note-canvas-element");
  const btn = document.getElementById("btn-export-img");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Rendering HD Image...`;
  initLucide();

  try {
    if (!window.html2canvas) {
      alert("Image renderer loading... please try again in a few seconds.");
      return;
    }

    const canvas = await html2canvas(canvasElement, {
      scale: 2, // High resolution retina scale
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    });

    const link = document.createElement("a");
    const safeTitle = (currentNote.title || "stylish-note").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.download = `${safeTitle}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Trigger celebration confetti
    triggerCelebration();
  } catch (err) {
    console.error("Export Image Failed:", err);
    alert("Could not generate image: " + err.message);
  } finally {
    btn.innerHTML = originalHtml;
    initLucide();
  }
}

// 3. Copy Formatted HTML for Microsoft Word & Google Docs
async function copyFormattedHtml() {
  const canvasElement = document.getElementById("note-canvas-element");
  const btn = document.getElementById("btn-copy-html");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Copied to Clipboard!`;
  initLucide();

  try {
    const htmlContent = canvasElement.outerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const textBlob = new Blob([canvasElement.innerText], { type: "text/plain" });

    if (navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob
        })
      ]);
    } else {
      await navigator.clipboard.writeText(canvasElement.innerText);
    }
  } catch (err) {
    console.error("Copy failed:", err);
    // Fallback
    navigator.clipboard.writeText(currentNote.content);
    alert("Markdown copied to clipboard!");
  }

  setTimeout(() => {
    btn.innerHTML = originalHtml;
    initLucide();
  }, 2200);
}

// 4. Download Markdown (.md)
function downloadMarkdown() {
  const safeTitle = (currentNote.title || "stylish-note").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const blob = new Blob([currentNote.content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeTitle}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================================
// AI & SMART GENERATOR MODAL
// ============================================================================

function openAiGeneratorModal() {
  document.getElementById("ai-modal").classList.remove("hidden");
  document.getElementById("ai-modal").classList.add("flex");
  initLucide();
}

function closeAiGeneratorModal() {
  document.getElementById("ai-modal").classList.add("hidden");
  document.getElementById("ai-modal").classList.remove("flex");
}

async function handleGenerateNoteSubmit() {
  const topicInput = document.getElementById("ai-topic-input");
  const topic = topicInput.value.trim();
  if (!topic) {
    alert("Please enter a topic or concept name.");
    return;
  }

  const style = document.getElementById("ai-style-select").value;
  const subject = document.getElementById("ai-subject-select").value;
  const apiKey = document.getElementById("ai-api-key").value.trim();
  const provider = document.getElementById("ai-provider-select").value;

  const btn = document.getElementById("ai-submit-btn");
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Generating Note...`;
  initLucide();

  try {
    const generated = await NoteGenerator.generate({
      topic,
      style,
      subject,
      apiKey,
      provider
    });

    // Create new note from generated
    currentNote = {
      id: "note-" + Date.now(),
      title: generated.title,
      subtitle: generated.subtitle,
      tag: generated.tag,
      theme: generated.theme || "pastel",
      font: currentNote.font || "sans",
      paper: currentNote.paper || "dots",
      layout: currentNote.layout || "standard",
      colorAccent: currentNote.colorAccent || "#6366f1",
      content: generated.content,
      updatedAt: new Date().toISOString()
    };

    savedNotes.unshift({ ...currentNote });
    saveNotesToStorage();
    renderNotesList();
    loadNote(currentNote);
    closeAiGeneratorModal();

    // Trigger celebration
    triggerCelebration();
  } catch (err) {
    alert("Generation failed: " + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
    initLucide();
  }
}

// Quick Topic Pick in Modal
function selectQuickTopic(topic, subject) {
  document.getElementById("ai-topic-input").value = topic;
  document.getElementById("ai-subject-select").value = subject;
}

// Celebration Confetti
function triggerCelebration() {
  if (window.confetti) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ============================================================================
// NOTES LIBRARY & TEMPLATES MODAL
// ============================================================================

function openLibraryModal() {
  renderNotesList();
  document.getElementById("library-modal").classList.remove("hidden");
  document.getElementById("library-modal").classList.add("flex");
  initLucide();
}

function closeLibraryModal() {
  document.getElementById("library-modal").classList.add("hidden");
  document.getElementById("library-modal").classList.remove("flex");
}

function renderNotesList() {
  const container = document.getElementById("notes-library-list");
  if (!container) return;

  if (savedNotes.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-slate-400">No saved notes yet. Create or generate one!</div>`;
    return;
  }

  let html = "";
  savedNotes.forEach(note => {
    const isCurrent = note.id === currentNote.id;
    html += `
      <div class="flex items-center justify-between p-3.5 rounded-xl border ${isCurrent ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'} transition cursor-pointer" onclick="switchNote('${note.id}')">
        <div class="min-w-0 pr-3">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-slate-200 truncate">${note.title || 'Untitled'}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">${note.tag || 'General'}</span>
          </div>
          <p class="text-xs text-slate-400 truncate mt-0.5">${note.subtitle || ''}</p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0" onclick="event.stopPropagation()">
          <button title="Duplicate Note" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition" onclick="duplicateNote('${note.id}')">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
          <button title="Delete Note" class="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition" onclick="deleteNote('${note.id}')">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  initLucide();
}

function switchNote(id) {
  const target = savedNotes.find(n => n.id === id);
  if (target) {
    loadNote(target);
    closeLibraryModal();
  }
}

function createNewNote() {
  const newNote = {
    id: "note-" + Date.now(),
    title: "New Stylish Note",
    subtitle: "Revision Summary",
    tag: "General",
    theme: "pastel",
    font: "sans",
    paper: "dots",
    layout: "standard",
    colorAccent: "#6366f1",
    content: `# ✦ NEW STYLISH NOTE\n*Subject • Quick Revision Notes*\n\n---\n\n> [!KEY] Core Idea\n> Write your central rule or definition here.\n\n---\n\n## 1. Overview\n\nStart typing your beautiful notes here!\n\n| Column 1 | Column 2 |\n| :--- | :--- |\n| Data A | Data B |\n\n> [!TIP] Pro Tip\n> Use the toolbar above to insert callouts, tables, and math!\n`,
    updatedAt: new Date().toISOString()
  };

  savedNotes.unshift(newNote);
  saveNotesToStorage();
  loadNote(newNote);
  closeLibraryModal();
}

function duplicateNote(id) {
  const target = savedNotes.find(n => n.id === id);
  if (target) {
    const clone = {
      ...target,
      id: "note-" + Date.now(),
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    savedNotes.unshift(clone);
    saveNotesToStorage();
    renderNotesList();
  }
}

function deleteNote(id) {
  if (savedNotes.length <= 1) {
    alert("You must keep at least one note in your library.");
    return;
  }
  if (confirm("Are you sure you want to delete this note?")) {
    savedNotes = savedNotes.filter(n => n.id !== id);
    saveNotesToStorage();
    if (currentNote.id === id) {
      loadNote(savedNotes[0]);
    }
    renderNotesList();
  }
}

