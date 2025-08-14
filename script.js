const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const notepad = document.getElementById("notepad");
const clearBtn = document.getElementById("clearBtn");
const downloadPdf = document.getElementById("downloadPdf");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrixEffect() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrixEffect, 50);

// Load saved text
notepad.innerHTML =
  localStorage.getItem("hackerNotes") || "Type your notes or code here...";

// Clear the notepad
clearBtn.addEventListener("click", () => {
  notepad.innerHTML = "";
  localStorage.removeItem("hackerNotes");
});

// Download as PDF
downloadPdf.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("courier", "normal");
  doc.setFontSize(12);
  doc.text(notepad.innerText, 10, 10);
  doc.save("Hacker_Notepad.pdf");
});
