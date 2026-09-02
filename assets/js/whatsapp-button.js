window.App = window.App || {};

App.whatsapp = (function () {
  function buildLink(customMessage) {
    const { number, defaultMessage } = App.config.whatsapp;
    const text = encodeURIComponent(customMessage || defaultMessage);
    return `https://wa.me/${number}?text=${text}`;
  }

  function mount() {
    const link = document.getElementById('whatsapp-float');
    if (link) {
      link.href = buildLink();
    }
  }

  return { buildLink, mount };
})();
