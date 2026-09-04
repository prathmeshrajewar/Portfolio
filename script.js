const roles = [
    "EMBEDDED SYSTEMS DEVELOPER",
    "IoT DEVELOPER",
    "LoRa COMMUNICATION ENTHUSIAST",
    "FIRMWARE DEVELOPER",
  ],
  typewriter = document.getElementById("typewriter");
let roleIndex = 0,
  charIndex = 0,
  isDeleting = false;
function typeEffect() {
  const r = roles[roleIndex];
  if (!isDeleting) {
    typewriter.textContent = r.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === r.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typewriter.textContent = r.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 35 : 70);
}
typeEffect();
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    }),
  { threshold: 0.12 },
);
reveals.forEach((e) => observer.observe(e));
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", window.scrollY > 50),
);
const menu = document.getElementById("menuBtn"),
  nav = document.querySelector(".nav-links");
menu.addEventListener("click", () => nav.classList.toggle("active"));
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("active")),
  );
const canvas = document.getElementById("networkCanvas"),
  ctx = canvas.getContext("2d");
let w,
  h,
  particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.sx = (Math.random() - 0.5) * 0.5;
    this.sy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.sx;
    this.y += this.sy;
    if (this.x < 0 || this.x > w) this.sx *= -1;
    if (this.y < 0 || this.y > h) this.sy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,198,255,.7)";
    ctx.fill();
  }
}
function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  particles = [];
  for (let i = 0; i < Math.min(80, Math.floor(w / 20)); i++)
    particles.push(new Particle());
}
resize();
addEventListener("resize", resize);
function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  for (let i = 0; i < particles.length; i++)
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x,
        dy = particles[i].y - particles[j].y,
        d = Math.hypot(dx, dy);
      if (d < 150) {
        ctx.strokeStyle = `rgba(0,140,255,${(1 - d / 150) * 0.18})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  requestAnimationFrame(animate);
}
animate();
