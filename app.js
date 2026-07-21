(() => {
  let state = AppStorage.load();
  const root = document.getElementById("app");

  const icons = { home: "⌂", academy: "▣", apprenticeship: "▤", documents: "▧", settings: "⚙" };

  function saveAndRender(message) {
    AppStorage.save(state);
    render();
    if (message) showToast(message);
  }

  function showToast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  function greeting() {
    const hour = new Date().getHours();
    const part = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const name = state.profile.preferredName || state.profile.firstName;
    return name ? `${part}, ${escapeHtml(name)}` : "Welcome to Apprentice+";
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function header(course) {
    return `
      <header class="topbar">
        <div class="brand-row">
          <div class="brand">
            <div class="logo-mark">A+</div>
            <div class="brand-copy">
              <h1>${APP_DATA.app.name}</h1>
              <p>${escapeHtml(course.name)} · Level ${course.level}</p>
            </div>
          </div>
          <button class="icon-btn" data-action="notifications" aria-label="Notifications">🔔</button>
        </div>
      </header>`;
  }

  function navigation() {
    const tabs = ["home", "academy", "apprenticeship", "documents", "settings"];
    return `<nav class="bottom-nav" aria-label="Main navigation">
      ${tabs.map(tab => `<button class="nav-btn ${state.settings.activeTab === tab ? "active" : ""}" data-tab="${tab}">
        <span class="nav-icon">${icons[tab]}</span>${tab === "apprenticeship" ? "Apprentice" : tab[0].toUpperCase() + tab.slice(1)}
      </button>`).join("")}
    </nav>`;
  }

  function homePage(course) {
    const stats = CourseEngine.assignmentStats(state, course);
    const overall = CourseEngine.overallProgress(state, course);
    return `<main class="page">
      <section class="hero">
        <p class="eyebrow">${APP_DATA.app.tagline}</p>
        <h2>${greeting()}</h2>
        <p>Build your evidence, develop your knowledge and prepare for EPA.</p>
      </section>

      <h2 class="section-title">Your progress</h2>
      <section class="card">
        <div class="grid two">
          <div><span class="small">Overall progress</span><div class="stat">${overall}%</div></div>
          <div><span class="small">Total XP</span><div class="stat">${state.xp}</div></div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${overall}%"></div></div>
        <p>${stats.completed} of ${stats.total} assignments completed. Assignment totals are defined by the selected course.</p>
      </section>

      <h2 class="section-title">Quick access</h2>
      <section class="grid two">
        <button class="feature-button" data-tab="apprenticeship">Assignments<span>Create and manage apprenticeship evidence.</span></button>
        <button class="feature-button" data-tab="academy">Academy<span>Learning, revision and EPA preparation.</span></button>
        <button class="feature-button" data-tab="documents">Documents<span>Access generated PDFs and certificates.</span></button>
        <button class="feature-button" data-tab="settings">Settings<span>Profile, course selection and preferences.</span></button>
      </section>

      <h2 class="section-title">Phase 1 foundation</h2>
      <section class="card">
        <h3>Core system active</h3>
        <p>Navigation, local storage, responsive design and the dynamic course engine are working. Later phases will plug into this foundation.</p>
      </section>
    </main>`;
  }

  function academyPage() {
    return `<main class="page">
      <section class="hero"><p class="eyebrow">Learning centre</p><h2>Academy</h2><p>Structured learning, revision, quizzes and EPA preparation.</p></section>
      <h2 class="section-title">Academy areas</h2>
      <section class="grid desktop-three">
        ${APP_DATA.academyCategories.map(c => `<button class="feature-button" data-action="phase2"><strong>${c.title}</strong><span>${c.description}</span></button>`).join("")}
      </section>
      <section class="card" style="margin-top:14px"><h3>Coming in Phase 3</h3><p>Lesson engine, quiz scoring, XP, certificates and course-specific Academy content.</p></section>
    </main>`;
  }

  function apprenticeshipPage(course) {
    const stats = CourseEngine.assignmentStats(state, course);
    const progress = CourseEngine.ensureProgress(state, course);
    return `<main class="page">
      <section class="hero"><p class="eyebrow">Portfolio workspace</p><h2>Apprenticeship</h2><p>${escapeHtml(course.name)} · ${course.reference} · Version ${course.version}</p></section>
      <h2 class="section-title">Assignments</h2>
      <section class="card"><h3>${stats.completed} of ${stats.total} complete</h3><div class="progress-track"><div class="progress-fill" style="width:${stats.percent}%"></div></div><p>The number of assignments is read directly from the course data.</p></section>
      <h2 class="section-title">Course assignments</h2>
      <section class="list">
        ${course.assignments.map(a => {
          const done = !!progress.assignments[a.id]?.completed;
          return `<div class="list-item"><div class="list-copy"><strong>Assignment ${a.number}: ${escapeHtml(a.title)}</strong><span>${done ? "Completed in the Phase 1 demo" : "Ready for evidence workflow in Phase 4"}</span></div><button class="badge ${done ? "ready" : "locked"}" data-demo-assignment="${a.id}">${done ? "Completed" : "Demo"}</button></div>`;
        }).join("")}
      </section>
    </main>`;
  }

  function documentsPage() {
    return `<main class="page">
      <section class="hero"><p class="eyebrow">Digital portfolio</p><h2>Documents</h2><p>Assignment PDFs, practical reports, certificates and EPA documents.</p></section>
      <h2 class="section-title">Document categories</h2>
      <section class="grid two">
        ${["Assignment PDFs", "Practical Reports", "Academy Certificates", "EPA Reports"].map(x => `<button class="feature-button" data-action="phase5"><strong>${x}</strong><span>0 documents</span></button>`).join("")}
      </section>
      <section class="card" style="margin-top:14px"><h3>Document engine reserved</h3><p>Automatic PDF creation, file indexing and ZIP portfolio exports will be added in Phase 5.</p></section>
    </main>`;
  }

  function settingsPage(course) {
    const courses = CourseEngine.getAllCourses(state);
    return `<main class="page">
      <section class="hero"><p class="eyebrow">App controls</p><h2>Settings</h2><p>Manage your profile, active course and preferences.</p></section>
      <h2 class="section-title">Profile</h2>
      <section class="card">
        <div class="form-group"><label for="firstName">First name</label><input id="firstName" value="${escapeHtml(state.profile.firstName)}" placeholder="Enter your first name"></div>
        <div class="form-group"><label for="preferredName">Preferred name</label><input id="preferredName" value="${escapeHtml(state.profile.preferredName)}" placeholder="Name used in the app"></div>
        <button class="primary-button" data-action="save-profile">Save profile</button>
      </section>
      <h2 class="section-title">Current course</h2>
      <section class="card">
        <div class="form-group"><label for="courseSelect">Selected apprenticeship</label><select id="courseSelect">
          ${courses.map(c => `<option value="${c.id}" ${c.id === course.id ? "selected" : ""}>${escapeHtml(c.name)} · ${c.reference} · Level ${c.level}</option>`).join("")}
        </select></div>
        <button class="primary-button" data-action="save-course">Apply course</button>
        <p style="margin-top:12px">The dashboard and assignment total update from the selected course definition.</p>
      </section>
      <h2 class="section-title">Application</h2>
      <section class="card"><p><strong>Version:</strong> ${APP_DATA.app.version}<br><strong>Build:</strong> ${APP_DATA.app.build}</p><button class="secondary-button" style="margin-top:14px" data-action="reset-app">Reset Phase 1 demo data</button></section>
    </main>`;
  }

  function pageFor(tab, course) {
    if (tab === "academy") return academyPage();
    if (tab === "apprenticeship") return apprenticeshipPage(course);
    if (tab === "documents") return documentsPage();
    if (tab === "settings") return settingsPage(course);
    return homePage(course);
  }

  function render() {
    const course = CourseEngine.getActiveCourse(state);
    CourseEngine.ensureProgress(state, course);
    root.innerHTML = header(course) + pageFor(state.settings.activeTab, course) + navigation();
    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => {
      state.settings.activeTab = button.dataset.tab;
      saveAndRender();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));

    document.querySelectorAll("[data-demo-assignment]").forEach(button => button.addEventListener("click", () => {
      const course = CourseEngine.getActiveCourse(state);
      const progress = CourseEngine.ensureProgress(state, course);
      const id = button.dataset.demoAssignment;
      const completed = !!progress.assignments[id]?.completed;
      progress.assignments[id] = { completed: !completed, updatedAt: new Date().toISOString() };
      state.xp = Math.max(0, state.xp + (!completed ? 100 : -100));
      saveAndRender(!completed ? "Demo assignment marked complete" : "Demo completion removed");
    }));

    document.querySelector("[data-action='save-profile']")?.addEventListener("click", () => {
      state.profile.firstName = document.getElementById("firstName").value.trim();
      state.profile.preferredName = document.getElementById("preferredName").value.trim();
      saveAndRender("Profile saved");
    });

    document.querySelector("[data-action='save-course']")?.addEventListener("click", () => {
      const id = document.getElementById("courseSelect").value;
      CourseEngine.setActiveCourse(state, id);
      saveAndRender("Course updated");
    });

    document.querySelector("[data-action='reset-app']")?.addEventListener("click", () => {
      if (confirm("Reset all Phase 1 demo data?")) {
        state = AppStorage.reset();
        render();
        showToast("App data reset");
      }
    });

    document.querySelector("[data-action='notifications']")?.addEventListener("click", () => showToast("Notification centre will be expanded in Phase 2"));
    document.querySelectorAll("[data-action='phase2']").forEach(b => b.addEventListener("click", () => showToast("Academy feature scheduled for Phase 3")));
    document.querySelectorAll("[data-action='phase5']").forEach(b => b.addEventListener("click", () => showToast("Document feature scheduled for Phase 5")));
  }

  window.addEventListener("error", event => {
    console.error(event.error || event.message);
    showToast("Something went wrong. Your saved data is protected.");
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(console.warn));
  }

  render();
})();
