/* ==========================================================================
   theme.js — light/dark mode toggle
   - Reads saved preference from localStorage on load
   - Applies data-theme="dark" on <html>
   - Updates the toggle icon and label
   - Saves preference when the user clicks the toggle
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle ? toggle.querySelector('[data-theme-icon]') : null;
  const label = toggle ? toggle.querySelector('[data-theme-label]') : null;

  // Apply a theme and update the toggle's visual state
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀';
    }
    if (label) {
      label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  }

  // On load: prefer saved choice, fall back to system preference
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  // On click: flip theme and save
  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }
})();