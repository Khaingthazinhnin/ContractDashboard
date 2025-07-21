// Draw Sign modal open(for Pc)
function drawSign() {
  const modal = document.getElementById("drawPadModal");
  modal.style.display = "flex";
}

// Drawing Pad Logic
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});
// Touch support(for phone)
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  drawing = true;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!drawing) return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
  ctx.stroke();
});

canvas.addEventListener("touchend", () => {
  drawing = false;
});

// Clear Button
document.getElementById("clearCanvasBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ✅ X icon ဖြင့် Pad ပိတ်သွားအောင် ထည့်ထားသည်
document.getElementById("closePadX").addEventListener("click", () => {
  document.getElementById("drawPadModal").style.display = "none";
});

// Save Button
document.getElementById("savePadBtn").addEventListener("click", () => {
  // Canvas data URL အဖြစ်ယူ
  const dataURL = canvas.toDataURL("image/png");
  console.log("Signature Saved:", dataURL);

  // Name ကို "user" အဖြစ်ထား
  document.getElementById("userNameDisplay").textContent = "Name: user";

  // Signature image ကိုထည့်
  const signatureImg = document.getElementById("signatureImage");
  signatureImg.src = dataURL;

  // Signature preview section ပြသ
  document.getElementById("signaturePreviewSection").style.display = "block";

  // Modal ပိတ်
  document.getElementById("drawPadModal").style.display = "none";
});

// Other navigation samples
function uploadFile() {
  alert("Go to Upload File page");
}

function checkContract() {
  alert("Go to Check Contract page");
}

function viewHistory() {
  alert("Go to View History page");
}

// Language Switch Logic
const langEn = document.getElementById("lang-en");
const langMyan = document.getElementById("lang-myan");

const translations = {
  en: {
    drawSign: "Draw Sign",
    createSignature: "Create your signature",
    uploadFile: "Upload File",
    uploadPdf: "Upload contract PDF",
    checkContract: "Check Contract",
    contractsWaiting: "Contracts waiting to sign",
    viewHistory: "View History",
    allRecords: "All signed records",
  },
  my: {
    drawSign: "လက်မှတ်ရေးဆွဲရန်",
    createSignature: "သင့်လက်မှတ်ဖန်တီးရန်",
    uploadFile: "စာချုပ်ဖိုင်တင်ရန်",
    uploadPdf: "စာချုပ်ဖိုင်တင်ရန်(PDF)",
    checkContract: "စာချုပ်စစ်ဆေးရန်",
    contractsWaiting: "လက်မှတ်ရေးရန်စာချုပ်များ",
    viewHistory: "မှတ်တမ်းကြည့်ရန်",
    allRecords: "လက်မှတ်ရေးပြီးမှတ်တမ်းများ",
  },
};

function switchLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[lang][key];
  });
}

langEn.addEventListener("click", () => {
  langEn.classList.add("active");
  langMyan.classList.remove("active");
  switchLanguage("en");
});

langMyan.addEventListener("click", () => {
  langMyan.classList.add("active");
  langEn.classList.remove("active");
  switchLanguage("my");
});

// Menu icon click
const menuIcon = document.getElementById("menuIcon");
menuIcon.addEventListener("click", () => {
  alert("Menu clicked. (Future: Open sidebar or mobile menu)");
});
