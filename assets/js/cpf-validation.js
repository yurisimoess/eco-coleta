window.App = window.App || {};

App.cpf = (function () {
  function onlyDigits(value) {
    return (value || '').replace(/\D/g, '');
  }

  function calcCheckDigit(base) {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i], 10) * (base.length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  }

  function isValid(rawCpf) {
    const cpf = onlyDigits(rawCpf);
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const base9 = cpf.slice(0, 9);
    const digit1 = calcCheckDigit(base9);
    const digit2 = calcCheckDigit(base9 + digit1);

    return cpf === base9 + String(digit1) + String(digit2);
  }

  function format(rawCpf) {
    const cpf = onlyDigits(rawCpf).slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return { isValid, format, onlyDigits };
})();
