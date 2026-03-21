const openQuote = document.getElementById("open-quote");
const openQuoteMobile = document.getElementById("open-quote-mobile");
const closeQuote = document.getElementById("close-quote");
const quoteOverlay = document.getElementById("quote-overlay");

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

const themeToggle = document.getElementById("theme-toggle");
const nav = document.querySelector(".nav");

openQuote.addEventListener("click", () => {
  quoteOverlay.classList.add("active");
  //document.body.style.overflow = "hidden";   // stop background scroll
});

openQuoteMobile.addEventListener("click", () => {
  quoteOverlay.classList.add("active");
  mobileMenu.classList.remove("show");
});

closeQuote.addEventListener("click", () => {
  quoteOverlay.classList.remove("active");
  //document.body.style.overflow = "hidden";   // stop background scrollsubmit
});

quoteOverlay.addEventListener("click", (e) => {
  if (e.target === quoteOverlay) {
    quoteOverlay.classList.remove("active");
  }
});

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}
document.getElementById("quote-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  console.log("Sending from browser 📤:", data); // 👈 add this

  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message || "Saved!");
    e.target.reset();
  } catch (err) {
    console.error("Fetch error ❌:", err);
  }
});


