// main.js - Shared logic for all pages (theme, accordions, calculators)

const THEME_LIGHT = 'friendly-tech';
const THEME_DARK = 'friendly-dark';

function applyTheme(theme) {
  const html = document.documentElement;
  const t = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  html.setAttribute('data-theme', t);
  html.classList.toggle('theme-dark', t === THEME_DARK);
  html.classList.toggle('theme-light', t === THEME_LIGHT);
  try { localStorage.setItem('ab_guide_theme', t); } catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('themeSelect');
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('ab_guide_theme');
    if (savedTheme === 'minimal-product') savedTheme = THEME_LIGHT;
  } catch {}
  const initial = savedTheme || themeSelect?.value || THEME_LIGHT;
  themeSelect.value = initial;
  applyTheme(initial);
  themeSelect?.addEventListener('change', (e) => applyTheme(e.target.value));
  themeSelect?.addEventListener('input', (e) => applyTheme(e.target.value));

  // Accordion toggles for glossary page
  document.querySelectorAll('.accordion-item summary').forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.parentElement;
      item.open = !item.open;
    });
  });
});
