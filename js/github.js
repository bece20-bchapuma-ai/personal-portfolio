/* ==========================================================================
   github.js — fetch latest public repos from the GitHub API
   - Uses fetch + async/await
   - Shows a loading state, an error state, and a rendered list
   - Limits to the 4 most recently updated repos
   ========================================================================== */

(function () {
  'use strict';

  const USERNAME = 'bece20-bchapuma-ai';
  const ENDPOINT = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=4`;
  const container = document.getElementById('repos');

  if (!container) return;

  function showStatus(message) {
    container.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'repos__status';
    p.textContent = message;
    container.appendChild(p);
  }

  function renderRepos(repos) {
    if (!repos.length) {
      showStatus('No public repositories yet.');
      return;
    }

    container.innerHTML = '';

    repos.forEach(function (repo) {
      const article = document.createElement('article');
      article.className = 'repo';

      const h3 = document.createElement('h3');
      h3.className = 'repo__title';
      const link = document.createElement('a');
      link.href = repo.html_url;
      link.textContent = repo.name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      h3.appendChild(link);

      const p = document.createElement('p');
      p.className = 'card__body';
      p.textContent = repo.description || 'No description provided.';

      const meta = document.createElement('div');
      meta.className = 'repo__meta';
      if (repo.language) {
        const lang = document.createElement('span');
        lang.textContent = repo.language;
        meta.appendChild(lang);
      }
      const stars = document.createElement('span');
      stars.textContent = '★ ' + (repo.stargazers_count || 0);
      meta.appendChild(stars);

      article.appendChild(h3);
      article.appendChild(p);
      article.appendChild(meta);
      container.appendChild(article);
    });
  }

  async function loadRepos() {
    container.setAttribute('aria-busy', 'true');
    showStatus('Loading repositories…');

    try {
      const response = await fetch(ENDPOINT, {
        headers: { 'Accept': 'application/vnd.github+json' }
      });

      if (!response.ok) {
        throw new Error('GitHub API responded with ' + response.status);
      }

      const data = await response.json();
      renderRepos(data);
    } catch (error) {
      console.error('Failed to load repositories:', error);
      showStatus('Sorry — could not load repositories right now. Please try again later.');
    } finally {
      container.setAttribute('aria-busy', 'false');
    }
  }

  loadRepos();
})();