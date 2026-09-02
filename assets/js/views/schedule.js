window.App = window.App || {};
App.views = App.views || {};

App.views.schedule = {
  render() {
    return `
      <section class="page-header">
        <h1>Agendar coleta</h1>
        <p>Preencha os dados abaixo ou, se preferir, fale com a gente pelo WhatsApp.</p>
      </section>

      <form id="schedule-form" class="schedule-form" novalidate>
        <div class="form-field">
          <label for="field-name">Nome completo</label>
          <input type="text" id="field-name" name="name" required autocomplete="name">
          <span class="field-error" id="error-name" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-email">E-mail</label>
          <input type="email" id="field-email" name="email" required autocomplete="email">
          <span class="field-error" id="error-email" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-phone">Telefone</label>
          <input type="tel" id="field-phone" name="phone" required inputmode="numeric" maxlength="15" placeholder="(00) 00000-0000" autocomplete="tel">
          <span class="field-error" id="error-phone" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-cpf">CPF</label>
          <input type="text" id="field-cpf" name="cpf" required inputmode="numeric" maxlength="14" placeholder="000.000.000-00">
          <span class="field-error" id="error-cpf" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-cep">CEP</label>
          <input type="text" id="field-cep" name="cep" required inputmode="numeric" maxlength="9" placeholder="00000-000">
          <span class="field-hint" id="cep-feedback" role="status" aria-live="polite"></span>
        </div>

        <div class="form-field">
          <label for="field-street">Rua</label>
          <input type="text" id="field-street" name="street" required>
          <span class="field-error" id="error-street" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-neighborhood">Bairro</label>
          <input type="text" id="field-neighborhood" name="neighborhood" required>
          <span class="field-error" id="error-neighborhood" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-number">Número</label>
          <input type="text" id="field-number" name="number" required inputmode="numeric">
          <span class="field-error" id="error-number" role="alert"></span>
        </div>

        <div class="form-field">
          <label for="field-complement">Complemento (opcional)</label>
          <input type="text" id="field-complement" name="complement">
        </div>

        <div class="form-field form-consent">
          <label class="consent-label">
            <input type="checkbox" id="field-consent" name="consent" required>
            <span>Li e concordo com o uso dos meus dados pessoais para viabilizar o agendamento da coleta, conforme a <a href="#/privacidade">Política de Privacidade</a>.</span>
          </label>
          <span class="field-error" id="error-consent" role="alert"></span>
        </div>

        <button type="submit" class="button button-primary">Enviar agendamento</button>

        <div id="form-feedback" class="form-feedback" role="status" aria-live="polite"></div>
      </form>
    `;
  },

  init() {
    const form = document.getElementById('schedule-form');
    if (!form) return;

    const cpfInput = document.getElementById('field-cpf');
    const phoneInput = document.getElementById('field-phone');
    const cepInput = document.getElementById('field-cep');
    const streetInput = document.getElementById('field-street');
    const neighborhoodInput = document.getElementById('field-neighborhood');
    const cepFeedback = document.getElementById('cep-feedback');
    const feedback = document.getElementById('form-feedback');

    cpfInput.addEventListener('input', () => {
      cpfInput.value = App.cpf.format(cpfInput.value);
    });

    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhone(phoneInput.value);
    });

    let cepLookupToken = 0;
    cepInput.addEventListener('blur', async () => {
      const rawCep = App.cpf.onlyDigits(cepInput.value);
      setCepFeedback('');
      if (rawCep.length !== 8) return;

      const currentToken = ++cepLookupToken;
      setCepFeedback('Buscando endereço...');

      try {
        const address = await App.cep.fetchAddress(rawCep);
        if (currentToken !== cepLookupToken) return;

        streetInput.value = address.street;
        neighborhoodInput.value = address.neighborhood;
        setCepFeedback(
          address.street
            ? 'Endereço encontrado. Confira e ajuste se necessário.'
            : 'CEP válido, mas preencha rua e bairro manualmente.'
        );
      } catch (error) {
        if (currentToken !== cepLookupToken) return;
        setCepFeedback(error.message, true);
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearErrors();
      feedback.textContent = '';
      feedback.className = 'form-feedback';

      const values = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        cpf: App.cpf.onlyDigits(form.cpf.value),
        cep: App.cpf.onlyDigits(form.cep.value),
        street: form.street.value.trim(),
        neighborhood: form.neighborhood.value.trim(),
        number: form.number.value.trim(),
        complement: form.complement.value.trim()
      };

      let hasError = false;

      if (!values.name) {
        setError('name', 'Informe o nome completo.');
        hasError = true;
      }
      if (!isValidEmail(values.email)) {
        setError('email', 'Informe um e-mail válido.');
        hasError = true;
      }
      if (App.cpf.onlyDigits(values.phone).length < 10) {
        setError('phone', 'Informe um telefone válido, com DDD.');
        hasError = true;
      }
      if (!App.cpf.isValid(values.cpf)) {
        setError('cpf', 'CPF inválido. Confira os números digitados.');
        hasError = true;
      }
      if (values.cep.length !== 8) {
        setCepFeedback('Informe um CEP válido.', true);
        hasError = true;
      }
      if (!values.street) {
        setError('street', 'Informe a rua.');
        hasError = true;
      }
      if (!values.neighborhood) {
        setError('neighborhood', 'Informe o bairro.');
        hasError = true;
      }
      if (!values.number) {
        setError('number', 'Informe o número da residência.');
        hasError = true;
      }
      if (!form.consent.checked) {
        setError('consent', 'É necessário concordar com o uso dos dados para continuar.');
        hasError = true;
      }

      if (hasError) return;

      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      feedback.textContent = 'Enviando agendamento...';

      try {
        await App.email.sendScheduleRequest({
          to_email: App.config.emailjs.toEmail,
          nome: values.name,
          email: values.email,
          telefone: values.phone,
          cpf: App.cpf.format(values.cpf),
          endereco: `${values.street}, ${values.number}${values.complement ? ' - ' + values.complement : ''} - ${values.neighborhood}`,
          cep: values.cep
        });
        feedback.textContent = 'Agendamento enviado com sucesso! Em breve entraremos em contato.';
        feedback.className = 'form-feedback form-feedback-success';
        form.reset();
        setCepFeedback('');
      } catch (error) {
        feedback.textContent = 'Não foi possível enviar o agendamento agora. Tente novamente ou fale com a gente pelo WhatsApp.';
        feedback.className = 'form-feedback form-feedback-error';
      } finally {
        submitButton.disabled = false;
      }
    });

    function formatPhone(rawValue) {
      const digits = App.cpf.onlyDigits(rawValue).slice(0, 11);
      if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2');
      }
      return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setCepFeedback(message, isError) {
      cepFeedback.textContent = message;
      cepFeedback.classList.toggle('is-error', !!isError);
    }

    function setError(field, message) {
      const el = document.getElementById(`error-${field}`);
      if (el) el.textContent = message;
    }

    function clearErrors() {
      form.querySelectorAll('.field-error').forEach((el) => {
        el.textContent = '';
      });
      setCepFeedback('');
    }
  }
};
