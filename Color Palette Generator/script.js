const divPalette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");

const COLORS_COUNT = 5;

// توليد لون عشوائي
function generateColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function copyToClipboard(text, iconElement) {
  navigator.clipboard.writeText(text);
  iconElement.className = "fa fa-check";
  setTimeout(() => (iconElement.className = "fa fa-copy"), 800);
}

// إنشاء palette
function generatePalette() {
  divPalette.innerHTML = ""; // نحيد القديم

  for (let i = 0; i < COLORS_COUNT; i++) {
    const color = generateColor();

    const divColorBox = document.createElement("div");
    divColorBox.className = "divColorBox";

    const divColor = document.createElement("div");
    divColor.className = "divColor";
    divColor.style.backgroundColor = color;

    // copy on click
    divColor.addEventListener("click", () => {
      copyToClipboard(color, i);
    });

    const divHexColor = document.createElement("div");
    divHexColor.className = "divHexColor";

    const p = document.createElement("p");
    p.textContent = color;

    const i = document.createElement("i");
    i.className = "fa fa-copy";

    i.addEventListener("click", () => {
      copyToClipboard(color, i);
    });

    divHexColor.appendChild(p);
    divHexColor.appendChild(i);

    divColorBox.appendChild(divColor);
    divColorBox.appendChild(divHexColor);

    divPalette.appendChild(divColorBox);
  }
}

// أول تحميل
generatePalette();

// زر generate
generateBtn.addEventListener("click", generatePalette);
