// ✅ Draw Sign Modal (for PC)
function drawSign() {
  if (hasUserSigned) {
    alert(
      "🖊 You have already signed and cannot sign again until you refresh (Only for test)."
    );
    return;
  }
  document.getElementById("drawPadModal").style.display = "flex";
}

// ✅ Drawing Pad Logic
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

// ✅ Touch Support (for Phone)
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

// ✅ Clear Pad
document.getElementById("clearCanvasBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ✅ Close Pad
document.getElementById("closePadX").addEventListener("click", () => {
  document.getElementById("drawPadModal").style.display = "none";
});

// ✅ Save Pad
let hasUserSigned = false;
document.getElementById("savePadBtn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  document.getElementById("userNameDisplay").textContent = "Name: user";
  const signatureImg = document.getElementById("signatureImage");
  signatureImg.src = dataURL;
  document.getElementById("signaturePreviewSection").style.display = "block";
  document.getElementById("drawPadModal").style.display = "none";
  hasUserSigned = true;
});

// ✅ Navigation Alerts
function uploadFile() {
  alert("Go to Upload File page");
}
function checkContract() {
  alert("Go to Check Contract page");
}
function viewHistory() {
  window.location.href = "history.html";
}

// ✅ Language Switch
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
    yourSignature: "Your Signature",
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
    yourSignature: "လက်မှတ်",
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

// ✅ Sidebar
document.getElementById("menuIcon").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("active");
});
document.getElementById("closeSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("active");
});
//for profile
document.getElementById("menuProfile").addEventListener("click", () => {
  document.getElementById("profileModal").style.display = "flex";
});

// Close profile modal
document.getElementById("closeProfile").addEventListener("click", () => {
  document.getElementById("profileModal").style.display = "none";
});
const developerMode = true; // ✅ Developer testing = true, User mode = false

const cameraInput = document.getElementById("cameraInput");
const galleryInput = document.getElementById("galleryInput");
const profileImage = document.getElementById("profileImage");

const hasProfilePhoto = localStorage.getItem("hasProfilePhoto") === "true";

if (developerMode) {
  // Developer testing - Always allow both camera + gallery
  cameraInput.style.display = "block";
  galleryInput.style.display = "block";
} else {
  // User Mode
  if (!hasProfilePhoto) {
    cameraInput.style.display = "block"; // First time: allow camera only
    galleryInput.style.display = "none";
  } else {
    cameraInput.style.display = "none";
    galleryInput.style.display = "block"; // After first photo, allow gallery
  }
}
document.getElementById("openCamera").addEventListener("click", () => {
  cameraInput.click();
});

document.getElementById("openGallery").addEventListener("click", () => {
  galleryInput.click();
});

// ✅ Camera Input Handler
cameraInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
      if (!developerMode) {
        localStorage.setItem("hasProfilePhoto", "true");
        cameraInput.style.display = "none";
        galleryInput.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  }
});

// ✅ Gallery Input Handler
galleryInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// ✅ Other Modals
document.getElementById("menuIdShare").addEventListener("click", () => {
  document.getElementById("idShareModal").style.display = "flex";
  document.getElementById("sidebar").classList.remove("active");
});
document.getElementById("closeIdShare").addEventListener("click", () => {
  document.getElementById("idShareModal").style.display = "none";
});
document.getElementById("menuSettings").addEventListener("click", () => {
  document.getElementById("settingsModal").style.display = "flex";
  document.getElementById("sidebar").classList.remove("active");
});
document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("settingsModal").style.display = "none";
});
document.getElementById("menuLogout").addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    alert("Logged out successfully.");
  }
});
document.getElementById("menuEmail").addEventListener("click", () => {
  alert("Email section clicked (future expansion).");
});
document.getElementById("menuHome").addEventListener("click", () => {
  alert("Home section clicked (future expansion).");
});
//view history
document.getElementById("viewHistoryCard").addEventListener("click", () => {
  window.location.href = "history.html";
});
