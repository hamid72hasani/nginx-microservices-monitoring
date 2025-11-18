async function loadProfile() {
    const nameEl = document.getElementById("name");
    const titleEl = document.getElementById("title");
    const descEl = document.getElementById("description");
    const githubEl = document.getElementById("github");

    try {
        const res = await fetch("/api/public/profile");
        const profile = await res.json();

        nameEl.textContent = profile.name || "نام ثبت نشده";
        titleEl.textContent = profile.title || "";
        descEl.textContent = profile.description || "";
        if (profile.github) {
            githubEl.href = profile.github;
        }
    } catch (e) {
        console.error("Error loading profile", e);
        nameEl.textContent = "خطا در بارگذاری پروفایل";
        titleEl.textContent = "";
        descEl.textContent = "";
    }
}

async function loadProjects() {
    const grid = document.getElementById("projects-list");
    const emptyEl = document.getElementById("projects-empty");
    const errorEl = document.getElementById("projects-error");
    const countEl = document.getElementById("projects-count");

    // حالت skeleton قبلی رو خالی می‌کنیم
    grid.innerHTML = "";

    try {
        const res = await fetch("/api/public/projects");
        const projects = await res.json();

        countEl.textContent = projects.length + " پروژه";

        if (!projects.length) {
            emptyEl.style.display = "block";
            return;
        }

        projects.forEach((p) => {
            const card = document.createElement("article");
            card.className = "card";

            card.innerHTML = `
                <div class="card-title">${escapeHtml(p.name || "")}</div>
                <div class="card-text">
                    ${escapeHtml(p.description || "")}
                </div>
                <div class="card-footer">
                    ${
                        p.url
                            ? `<a class="card-link" href="${escapeAttr(
                                  p.url
                              )}" target="_blank" rel="noopener noreferrer">مشاهده در گیت‌هاب</a>`
                            : ""
                    }
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (e) {
        console.error("Error loading projects", e);
        errorEl.style.display = "block";
        countEl.textContent = "خطا";
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
}

loadProfile();
loadProjects();

