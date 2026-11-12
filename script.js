// script.js

// ═══ 1. Плавний скрол до секцій ═══
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      // Враховуємо висоту navbar (64px)
      const offset = target.offsetTop - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ═══ 2. Активний пункт меню при скролі ═══
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Знімаємо active з усіх посилань
        navLinks.forEach(l => l.classList.remove('active'));

        // Додаємо active до посилання що відповідає секції
        const activeLink = document.querySelector(
          `.nav__link[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-30% 0px -60% 0px',  /* тригер коли секція в середині екрану */
    threshold: 0
  }
);

sections.forEach(section => observer.observe(section));

// ═══ 3. Форма: заглушка відправки ═══
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = e.target.querySelector('.btn--submit');
  btn.textContent = '✅ Відправлено!';
  btn.disabled = true;
  btn.style.background = '#3fb950';
  btn.style.color = '#0d1117';

  // Скидаємо через 3 секунди
  setTimeout(() => {
    btn.textContent = 'Надіслати повідомлення →';
    btn.disabled = false;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
});