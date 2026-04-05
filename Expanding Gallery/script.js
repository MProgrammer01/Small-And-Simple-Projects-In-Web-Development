const panels = document.querySelectorAll(".gallery-panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    // Remove expanded class from all panels
    panels.forEach((p) => p.classList.remove("expanded"));
    // Add expanded class to clicked panel
    panel.classList.add("expanded");
  });
});
