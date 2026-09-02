window.App = window.App || {};

App.router = (function () {
  function getViews() {
    return {
      '': App.views.home,
      '/home': App.views.home,
      '/artigos': App.views.articles,
      '/agendamento': App.views.schedule,
      '/sobre': App.views.about,
      '/privacidade': App.views.privacy
    };
  }

  function currentPath() {
    const hash = window.location.hash || '#/home';
    return hash.replace(/^#/, '');
  }

  function updateActiveNav(path) {
    document.querySelectorAll('.nav-link').forEach((link) => {
      const linkPath = link.getAttribute('href').replace(/^#/, '');
      link.classList.toggle('active', linkPath === path || (linkPath === '/home' && path === ''));
    });
  }

  function render() {
    const views = getViews();
    const path = currentPath();
    const view = views[path] || views['/home'];
    const app = document.getElementById('app');

    app.innerHTML = view.render();
    if (typeof view.init === 'function') {
      view.init();
    }

    updateActiveNav(path);
    app.focus();
  }

  function init() {
    window.addEventListener('hashchange', render);
    render();
  }

  return { init };
})();
