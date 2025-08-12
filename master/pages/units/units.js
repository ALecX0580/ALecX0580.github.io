document.addEventListener("DOMContentLoaded", () => {
  // Expand collapse categories and subcategories
  document.querySelectorAll(".units-category-header, .units-subcategory-header").forEach(header => {
    header.addEventListener("click", () => {
      header.classList.toggle("active");
      const nextEl = header.nextElementSibling;
      if (nextEl) {
        nextEl.style.display = nextEl.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Show selected unit details
  const unitInfo = {
    salvager: {
      title: "Salvager",
      description: "Basic economic and industrial vehicle.",
      image: "../../media/images/units/coalition/salvager.jpg"
    },
    lav: {
      title: "Light Assault Vehicle (LAV)",
      description: "Fast moving Strikecraft. Strong against Ranged vehicles.",
      image: "../../media/images/units/coalition/lav.jpg"
    },
  };

  // Track currently active unit in sidebar
  let activeItem = null;

  document.querySelectorAll(".units-item").forEach(item => {
    item.addEventListener("click", () => {
      if (activeItem) activeItem.classList.remove("active");
      item.classList.add("active");
      activeItem = item;

      const key = item.getAttribute("data-unit");
      const unit = unitInfo[key];
      if (unit) {
        document.getElementById("units-main").innerHTML = `
          <h2 class="units-details__title">${unit.title}</h2>
          <img src="${unit.image}" alt="${unit.title}" style="max-width: 300px; border-radius:4px;">
          <p class="units-details__description">${unit.description}</p>
        `;
      }
    });
  });
});
