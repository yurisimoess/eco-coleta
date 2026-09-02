window.App = window.App || {};

App.cep = (function () {
  async function fetchAddress(rawCep) {
    const cep = (rawCep || '').replace(/\D/g, '');
    if (cep.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos.');
    }

    let response;
    try {
      response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    } catch (networkError) {
      throw new Error('Não foi possível consultar o CEP agora. Preencha o endereço manualmente.');
    }

    if (!response.ok) {
      throw new Error('Não foi possível consultar o CEP agora. Preencha o endereço manualmente.');
    }

    const data = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado. Confira o número ou preencha o endereço manualmente.');
    }

    return {
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || ''
    };
  }

  return { fetchAddress };
})();
