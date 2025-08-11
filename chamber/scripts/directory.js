const lastModEl = document.getElementById("last-modified");
if (lastModEl) {
  const formatted = new Date(document.lastModified).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
  lastModEl.textContent = `Last Modification: ${formatted}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("ham-btn");
  const navigation = document.getElementById("nav-bar");

  if (hamburger && navigation) {
    hamburger.addEventListener("click", () => {
      navigation.classList.toggle("open");
      hamburger.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navigation.contains(e.target)) {
        navigation.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });

    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }

  const main = document.querySelector("main");
  const existingGrid = document.getElementById("directory-grid");
  
  if (main && existingGrid) {
    existingGrid.style.minHeight = "400px";
    
    const viewToggle = document.createElement("div");
    viewToggle.className = "view-toggle";
    viewToggle.innerHTML = `
      <button id="grid-view" aria-pressed="true">Grid View</button>
      <button id="list-view" aria-pressed="false">List View</button>
    `;
    main.insertBefore(viewToggle, existingGrid);

    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");
    const grid = document.getElementById("directory-grid");

    function renderMembers(members, view = "grid") {
      if (!grid) return;
      
      const currentHeight = grid.offsetHeight;
      grid.style.minHeight = currentHeight + "px";
      
      const loadingPlaceholder = grid.querySelector(".loading-placeholder");
      if (loadingPlaceholder) {
        loadingPlaceholder.style.display = "none";
      }
      
      grid.innerHTML = "";
      grid.className = view === "grid" ? "directory-grid" : "directory-list";
      
      members.forEach(member => {
        if (view === "grid") {
          const card = document.createElement("div");
          card.className = "business-card";
          card.innerHTML = `
            <div class="business-img">
              ${member.image ? `<img src="${member.image}" alt="${member.name} logo" loading="lazy">` : ""}
            </div>
            <div class="business-info">
              <h2>${member.name}</h2>
              <p>${member.tagline || ""}</p>
              <p><strong>Email:</strong> ${member.email || "N/A"}</p>
              <p><strong>Phone:</strong> ${member.phone || "N/A"}</p>
              <p><strong>URL:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
            </div>
          `;
          grid.appendChild(card);
        } else {
          const item = document.createElement("div");
          item.className = "business-list-item";
          item.innerHTML = `
            <span class="list-name">${member.name}</span>
            <span class="list-tagline">${member.tagline || ""}</span>
            <span class="list-email">${member.email || "N/A"}</span>
            <span class="list-phone">${member.phone || "N/A"}</span>
            <span class="list-url"><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></span>
          `;
          grid.appendChild(item);
        }
      });
      
      setTimeout(() => {
        grid.style.minHeight = "auto";
      }, 100);
    }

    async function fetchMembers() {
      try {
        const response = await fetch("scripts/members.json");
        const data = await response.json();
        return data.members;
      } catch (error) {
        console.error("Error fetching members:", error);
        return [];
      }
    }

    fetchMembers().then(members => {
      if (gridBtn && listBtn && grid) {
        renderMembers(members, "grid");

        gridBtn.addEventListener("click", () => {
          gridBtn.setAttribute("aria-pressed", "true");
          listBtn.setAttribute("aria-pressed", "false");
          renderMembers(members, "grid");
        });

        listBtn.addEventListener("click", () => {
          gridBtn.setAttribute("aria-pressed", "false");
          listBtn.setAttribute("aria-pressed", "true");
          renderMembers(members, "list");
        });
      }
    });
  }
});