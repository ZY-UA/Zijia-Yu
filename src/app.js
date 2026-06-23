const projects = [
  {
    id: "psychedelics-connectivity-review",
    title: "Psychedelics & Brain Connectivity",
    year: "2024",
    type: "publication",
    place: "review",
    tags: ["Scoping Review", "Brain Networks", "Subjective Experience"],
    methods: "Literature synthesis, network connectivity concepts, psychiatry",
    link: "https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2024.1386321/full",
    linkLabel: "Read in Frontiers",
    summary:
      "Published Frontiers in Psychiatry scoping review on alterations in brain network connectivity and subjective experience induced by psychedelics.",
    question:
      "How do psychedelics alter brain network connectivity, and how are those changes linked to subjective experience?",
    outcome:
      "Published in Frontiers in Psychiatry, 15, 1386321, with Burback, Winkler, Xu, Dennett, Vermetten, Greenshaw, Li, Milne, Wang, Cao, Winship, Zhang, and Chan.",
  },
  {
    id: "fens-2026-accepted-abstract",
    title: "FENS Forum 2026 Abstract",
    year: "2026",
    type: "conference",
    place: "connectivity",
    tags: ["Accepted Abstract", "Shank3B", "Cortical Dynamics"],
    methods: "Optical in vivo imaging, functional connectivity, sensory processing, behavior",
    summary:
      "Accepted abstract on cortical hyperexcitability, global signal dynamics, and functional connectivity in Shank3B knockout mice.",
    question:
      "How do altered cortical activity and network dynamics relate to sensory processing and behavioral phenotypes in Shank3B knockout mice?",
    outcome:
      "FENS Forum 2026, Barcelona, Spain.",
  },
  {
    id: "sfn-2023-abstract",
    title: "SFN 2023 Abstract",
    year: "2023",
    type: "conference",
    place: "asd",
    tags: ["Conference Abstract", "ASD Model", "Connectivity"],
    methods: "Widefield calcium imaging, behavioral analysis, cortical activity mapping",
    summary:
      "Conference abstract on altered cortical activity, connectivity, and associated behavioral abnormalities in the Shank3B mouse model of ASD.",
    question:
      "How are cortical activity and connectivity abnormalities associated with behavioral phenotypes in Shank3B knockout mice?",
    outcome:
      "Presented at the Society for Neuroscience Annual Meeting, November 2023.",
  },
];

const lightboxItems = [
  {
    image: "./public/assets/figure-imaging-setup.png",
    caption: "Mesoscale calcium imaging setup.",
  },
  {
    image: "./public/assets/figure-dynamic-spontaneous.png",
    caption: "Baseline spontaneous dynamic activity in Shank3B mice.",
  },
  {
    image: "./public/assets/figure-functional-connectivity.png",
    caption: "Functional connectivity change in Shank3B mice.",
  },
  {
    image: "./public/assets/figure-sensory-evoked.png",
    caption: "Sensory-evoked hyperactivity in Shank3B mice.",
  },
  {
    image: "./public/assets/photography/people-01.jpg",
    caption: "People, photograph 01.",
  },
  {
    image: "./public/assets/photography/people-02.jpg",
    caption: "People, photograph 02.",
  },
  {
    image: "./public/assets/photography/people-03.jpg",
    caption: "People, photograph 03.",
  },
  {
    image: "./public/assets/photography/people-04.jpg",
    caption: "People, photograph 04.",
  },
  {
    image: "./public/assets/photography/people-05.jpg",
    caption: "People, photograph 05.",
  },
  {
    image: "./public/assets/photography/people-06.jpg",
    caption: "People, photograph 06.",
  },
  {
    image: "./public/assets/photography/people-07.jpg",
    caption: "People, photograph 07.",
  },
  {
    image: "./public/assets/photography/places-01.jpg",
    caption: "Places, photograph 01.",
  },
  {
    image: "./public/assets/photography/places-02.jpg",
    caption: "Places, photograph 02.",
  },
  {
    image: "./public/assets/photography/places-03.jpg",
    caption: "Places, photograph 03.",
  },
  {
    image: "./public/assets/photography/places-04.jpg",
    caption: "Places, photograph 04.",
  },
  {
    image: "./public/assets/photography/places-05.jpg",
    caption: "Places, photograph 05.",
  },
  {
    image: "./public/assets/photography/places-06.jpg",
    caption: "Places, photograph 06.",
  },
];

const state = {
  filter: "all",
  place: "all",
  year: "all",
  grid: false,
  lightboxIndex: 0,
};

const projectList = document.querySelector("[data-project-list]");
const drawer = document.querySelector("[data-drawer]");
const drawerContent = document.querySelector("[data-drawer-content]");
const lightbox = document.querySelector("[data-lightbox-panel]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");

function getFilteredProjects() {
  return projects.filter((project) => {
    const typeMatch = state.filter === "all" || project.type === state.filter;
    const placeMatch = state.place === "all" || project.place === state.place;
    const yearMatch = state.year === "all" || project.year === state.year;
    return typeMatch && placeMatch && yearMatch;
  });
}

function renderProjects() {
  const items = getFilteredProjects();
  projectList.classList.toggle("grid-view", state.grid);

  if (!items.length) {
    projectList.innerHTML = `
      <article class="project-card">
        <p>No work matches this filter yet. Try All or clear the place/year filter.</p>
      </article>
    `;
    return;
  }

  projectList.innerHTML = items
    .map(
      (project) => `
        <article class="project-card" data-project="${project.id}">
          <button class="project-thumb" type="button" data-open-project="${project.id}" aria-label="Open ${project.title}">
            <span>${project.year}</span>
            <strong>${project.tags[0]}</strong>
            <em>${project.type}</em>
          </button>
          <div>
            <span class="project-year">${project.year}</span>
            <h3 class="project-title">${project.title}</h3>
            <div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          </div>
          <p>${project.summary}</p>
          <div class="project-actions">
            <span>${project.methods}</span>
            <button class="open-project" type="button" data-open-project="${project.id}">Open Project</button>
            ${project.link ? `<a class="open-project inline-link" href="${project.link}">${project.linkLabel || "Open Link"}</a>` : ""}
            <button class="bookmark" type="button" aria-label="Save ${project.title} for later"></button>
          </div>
        </article>
      `,
    )
    .join("");
}

function setActiveTab(filter) {
  state.filter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });
  renderProjects();
}

function setActiveYear(year) {
  state.year = year;
  document.querySelector("[data-year-filter]").value = year;
  document.querySelectorAll("[data-year-jump]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.yearJump === year);
  });
  renderProjects();
}

function openDrawer(projectId) {
  const project = projects.find((item) => item.id === projectId) || projects[0];
  const linkSection = project.link
    ? `
      <section>
        <h3>Link</h3>
        <p><a href="${project.link}">${project.linkLabel || "Open project link"}</a></p>
      </section>
    `
    : "";

  drawerContent.innerHTML = `
    <figure class="drawer-hero">
      <div class="drawer-visual-slot">
        <span>${project.year}</span>
        <strong>${project.title}</strong>
        <em>Replace this slot with a selected slide figure, poster panel, or approved research image.</em>
      </div>
    </figure>
    <span class="project-year">${project.year}</span>
    <h2 id="drawer-title">${project.title}</h2>
    <div class="drawer-meta">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <p>${project.summary}</p>
    <div class="drawer-grid">
      <section>
        <h3>Research Question</h3>
        <p>${project.question}</p>
      </section>
      <section>
        <h3>Output</h3>
        <p>${project.outcome}</p>
      </section>
      <section>
        <h3>Methods</h3>
        <p>${project.methods}</p>
      </section>
      ${linkSection}
    </div>
  `;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("[data-close-drawer]").focus();
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openLightbox(index) {
  state.lightboxIndex = Number(index);
  updateLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("[data-close-lightbox]").focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const item = lightboxItems[state.lightboxIndex];
  lightboxImage.src = item.image;
  lightboxImage.alt = item.caption;
  lightboxCaption.textContent = item.caption;
}

function moveLightbox(direction) {
  const next = state.lightboxIndex + direction;
  state.lightboxIndex = (next + lightboxItems.length) % lightboxItems.length;
  updateLightbox();
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.filter));
});

document.querySelector("[data-toggle-panel]").addEventListener("click", () => {
  const panel = document.querySelector("[data-filter-panel]");
  panel.hidden = !panel.hidden;
});

document.querySelector("[data-view-toggle]").addEventListener("click", (event) => {
  state.grid = !state.grid;
  event.currentTarget.textContent = state.grid ? "View Rows" : "View List";
  renderProjects();
});

document.querySelector("[data-place-filter]").addEventListener("change", (event) => {
  state.place = event.target.value;
  renderProjects();
});

document.querySelector("[data-year-filter]").addEventListener("change", (event) => {
  setActiveYear(event.target.value);
});

document.querySelectorAll("[data-year-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveYear(button.dataset.yearJump);
    document.querySelector("#work").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-place-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    state.place = button.dataset.placeJump;
    document.querySelector("[data-place-filter]").value = state.place;
    renderProjects();
  });
});

document.addEventListener("click", (event) => {
  const openProject = event.target.closest("[data-open-project]");
  if (openProject) {
    openDrawer(openProject.dataset.openProject);
  }

  const lightboxTrigger = event.target.closest("[data-lightbox]");
  if (lightboxTrigger) {
    openLightbox(lightboxTrigger.dataset.lightbox);
  }

  const scrollButton = event.target.closest("[data-scroll]");
  if (scrollButton) {
    document.querySelector(scrollButton.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelector("[data-close-drawer]").addEventListener("click", closeDrawer);
document.querySelector("[data-close-lightbox]").addEventListener("click", closeLightbox);
document.querySelector("[data-lightbox-prev]").addEventListener("click", () => moveLightbox(-1));
document.querySelector("[data-lightbox-next]").addEventListener("click", () => moveLightbox(1));

drawer.addEventListener("click", (event) => {
  if (event.target === drawer) {
    closeDrawer();
  }
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    closeLightbox();
  }
  if (lightbox.classList.contains("is-open") && event.key === "ArrowLeft") {
    moveLightbox(-1);
  }
  if (lightbox.classList.contains("is-open") && event.key === "ArrowRight") {
    moveLightbox(1);
  }
});

document.querySelector(".menu-button").addEventListener("click", (event) => {
  const nav = document.querySelector("#site-nav");
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name") || "Portfolio visitor";
  const note = formData.get("note") || "Hi, I would like to connect about your work.";
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(note);
  const recipient = "zijia4@ualberta.ca";
  const personal = "yuzijia1995@gmail.com";
  window.location.href = `mailto:${recipient}?cc=${personal}&subject=${subject}&body=${body}`;
});

document.querySelector('[data-year-jump="all"]').classList.add("is-active");
renderProjects();
