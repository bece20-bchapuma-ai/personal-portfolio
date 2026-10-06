/* ==========================================================================
   nav.js — mobile slide-down navigation
   - Toggles the .mobile-nav panel open/closed
   - Updates aria-expanded on the button
   - Closes on outside click, on link click, and on Escape
   ========================================================================== */

(function () {
  'use strict';

  const btn = document.getElementById('nav-toggle');
  const panel = document.getElementById('mobile-nav');

  if (!btn || !panel) return;

  function setOpen(open) {
    panel.setAttribute('data-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  // Toggle on click
  btn.addEventListener('click', function (event) {
    event.stopPropagation();
    const isOpen = panel.getAttribute('data-open') === 'true';
    setOpen(!isOpen);
  });

  // Close when a link inside the panel is clicked
  panel.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  // Close on outside click
  document.addEventListener('click', function (event) {
    if (!panel.contains(event.target) && event.target !== btn) {
      setOpen(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setOpen(false);
  });
})();