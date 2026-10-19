(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const header = document.querySelector("[data-header]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Tema persistente; usa a preferência do sistema na primeira visita.
  const storedTheme = localStorage.getItem("vinicius-theme");
  const initialTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("vinicius-theme", theme);
    themeToggle?.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    themeMeta?.setAttribute("content", theme === "dark" ? "#111310" : "#f3f4ee");
  }

  setTheme(initialTheme);
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  function closeMenu() {
    mobileNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    mobileNav?.classList.toggle("open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    body.classList.toggle("menu-open", !isOpen);
  });

  document.querySelectorAll("[data-nav]").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

  // Realce do link ativo conforme a seção visível.
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    },
    { rootMargin: "-20% 0px -60%", threshold: [0.1, 0.35, 0.6] }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // Animações de entrada acessíveis.
  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion.matches) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Cargo com efeito de digitação.
  const typeTarget = document.querySelector("[data-typewriter]");
  const phrases = ["Desenvolvedor em formação", "Back-end · Java · Laravel", "Construindo soluções full stack"];
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;

  function typeLoop() {
    if (!typeTarget || reducedMotion.matches) return;
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    typeTarget.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 42 : 72;
    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 360;
    }
    window.setTimeout(typeLoop, delay);
  }
  if (!reducedMotion.matches) window.setTimeout(typeLoop, 1500);

  // Copiar e-mail com fallback para navegadores antigos.
  const copyButton = document.querySelector("[data-copy-email]");
  const copyLabel = document.querySelector("[data-copy-label]");
  const toast = document.querySelector("[data-toast]");
  let toastTimer;

  async function copyEmail() {
    const email = copyButton?.dataset.email;
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("textarea");
      input.value = email;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    if (copyLabel) copyLabel.textContent = "Copiado ✓";
    toast?.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast?.classList.remove("show");
      if (copyLabel) copyLabel.textContent = "Copiar e-mail";
    }, 2300);
  }
  copyButton?.addEventListener("click", copyEmail);

  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());

  // Canvas leve para partículas no hero, sem dependências externas.
  const canvas = document.querySelector("[data-particles]");
  const context = canvas?.getContext("2d");
  const particles = [];
  let animationFrame;

  function particleColor() {
    return root.dataset.theme === "dark" ? "168,255,96" : "51,105,18";
  }

  function resizeCanvas() {
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    const amount = Math.min(55, Math.floor(rect.width / 24));
    for (let i = 0; i < amount; i += 1) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 1.35 + 0.45,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18
      });
    }
  }

  function drawParticles() {
    if (!canvas || !context || reducedMotion.matches) return;
    const { width, height } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particleColor()}, .5)`;
      context.fill();

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 105) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${particleColor()}, ${0.09 * (1 - distance / 105)})`;
          context.stroke();
        }
      }
    });
    animationFrame = window.requestAnimationFrame(drawParticles);
  }

  if (canvas && context && !reducedMotion.matches) {
    resizeCanvas();
    drawParticles();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) window.cancelAnimationFrame(animationFrame);
      else drawParticles();
    });
  }
})();
