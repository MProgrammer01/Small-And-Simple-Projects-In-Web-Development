const items = document.querySelectorAll(".Card");
const zones = document.querySelectorAll(".Column");

items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});


zones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
});

zones.forEach((zone) => {
  zone.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);

    if (draggedElement) {
      zone.appendChild(draggedElement);
    }
  });
});

