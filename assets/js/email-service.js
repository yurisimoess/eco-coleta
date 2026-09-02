window.App = window.App || {};

App.email = (function () {
  let initialized = false;

  function ensureInit() {
    if (initialized) return;
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS não carregado.');
    }
    emailjs.init(App.config.emailjs.publicKey);
    initialized = true;
  }

  async function sendScheduleRequest(templateParams) {
    ensureInit();
    const { serviceId, templateId } = App.config.emailjs;
    return emailjs.send(serviceId, templateId, templateParams);
  }

  return { sendScheduleRequest };
})();
