// Navigation enhancement only: all content and links work without JavaScript.
const navigationLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = navigationLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function updateNavigation() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) current = section;
  }
  for (const link of navigationLinks) {
    if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
}, { passive: true });
updateNavigation();
