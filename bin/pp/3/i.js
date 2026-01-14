// ✅ Loader fade out
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper");
  if (loader) loader.style.display = "none";
});

// ✅ Navigation active link on scroll
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  function highlightNav() {
    let current = "";
    let scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("light");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("light");
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
});

// ✅ Collapse logic for categories
const sections = document.querySelectorAll("section");
const wdli = document.getElementById("wdli");
const gdli = document.getElementById("gdli");
const prli = document.getElementById("prli");
const adli = document.getElementById("adli");
const pfli = document.getElementById("pfli");
const skdis = document.getElementById("sk-dis");

const inputs = {
  wd: document.getElementById("wdinp"),
  gd: document.getElementById("gdinp"),
  pr: document.getElementById("prinp"),
  ad: document.getElementById("adinp"),
  pf: document.getElementById("pfinp"),
};

function toggleSection(inp, li) {
  if (inp.checked) {
    Object.values(inputs).forEach(i => (i.checked = false));
    [wdli, gdli, prli, adli, pfli].forEach(el => (el.style.display = "none"));

    inp.checked = true;
    if (window.matchMedia("(max-width: 600px)").matches) {
      li.style.display = "block";
    } else {
      skdis.appendChild(li);
      li.style.display = "block";
    }
    li.classList.add("down");
  } else {
    li.classList.remove("down");
    li.style.display = "none";
  }
}

// ✅ Scroll animations + back to top button
const mybutton = document.getElementById("myBtn");

function onScroll() {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 600;
    let height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      sec.classList.add("active");
      sec.classList.remove("opp");
    } else {
      sec.classList.remove("active");
    }
  });

  // Show "back to top" button
  mybutton.style.display = (document.documentElement.scrollTop > 20) ? "flex" : "none";
}

window.addEventListener("scroll", onScroll);

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ✅ Popup logic
const popcls = document.getElementById("popcls");
const popup1 = document.getElementById("popup1");
const mainpop = document.getElementById("mainpop");
const subcon = document.getElementById("subcon");
const leftbtn = document.getElementById("left");
const rightbtn = document.getElementById("right");

function popup(event) {
  document.body.style.overflow = "hidden";
  popcls.style.display = popup1.style.display = "block";
  subcon.innerHTML = "";
  const img = event.target.closest(".prg-mini").querySelectorAll("img");
  mainpop.innerHTML = img[0].outerHTML;
  img.forEach(i => (subcon.innerHTML += i.outerHTML));
  leftbtn.style.display = "none";
  rightbtn.style.display = "flex";
}

function cls() {
  document.body.style.overflow = "auto";
  popcls.style.display = popup1.style.display = "none";
  mainpop.innerHTML = subcon.innerHTML = "";
}

function navigate(dir) {
  const sublist = subcon.querySelectorAll("img");
  const popimg = mainpop.querySelector("img");
  let idx = [...sublist].findIndex(img => img.outerHTML === popimg.outerHTML);

  if (dir === "left" && idx > 0) {
    mainpop.innerHTML = sublist[idx - 1].outerHTML;
  }
  if (dir === "right" && idx < sublist.length - 1) {
    mainpop.innerHTML = sublist[idx + 1].outerHTML;
  }

  leftbtn.style.display = (idx - 1 <= 0) ? "none" : "flex";
  rightbtn.style.display = (idx + 1 >= sublist.length - 1) ? "none" : "flex";
}

// ✅ Menu toggle
const temp = document.getElementById("temp");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

function menuclick() {
  const isHidden = temp.style.display === "none";
  temp.style.display = isHidden ? "block" : "none";
  menu.classList.toggle("menurot", isHidden);
  menu.classList.toggle("menurotre", !isHidden);
  nav.classList.toggle("comeaw", isHidden);
  nav.classList.toggle("goaw", !isHidden);
}

// ✅ Remove all checked states initially
Object.values(inputs).forEach(i => (i.checked = false));

// ✅ Example responsive styling
if (window.matchMedia("(max-width: 600px)").matches) {
  document.body.style.backgroundColor = "yellow";
} else {
  document.body.style.backgroundColor = "black";
}
