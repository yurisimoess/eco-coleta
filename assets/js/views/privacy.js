window.App = window.App || {};
App.views = App.views || {};

App.views.privacy = {
  render() {
    return `
      <section class="page-header">
        <h1>Política de Privacidade</h1>
        <p>Como tratamos os dados pessoais informados no formulário de agendamento de coleta.</p>
      </section>

      <section class="privacy-content">
        <h2>Quais dados coletamos</h2>
        <p>Ao preencher o formulário de agendamento, coletamos: nome completo, e-mail, telefone, CPF e endereço (CEP, rua, bairro, número e complemento).</p>

        <h2>Para que usamos esses dados</h2>
        <p>Os dados são usados exclusivamente para viabilizar o agendamento da coleta de lixo eletrônico junto ao Ecoponto Mary Dota, permitindo identificar o solicitante, confirmar o endereço de coleta e entrar em contato para combinar data e horário. O CPF é solicitado para identificar o solicitante e evitar agendamentos duplicados ou fraudulentos.</p>

        <h2>Base legal</h2>
        <p>O tratamento dos dados é realizado com base no consentimento do titular (art. 7º, I, da Lei Geral de Proteção de Dados — Lei nº 13.709/2018), fornecido ao marcar a opção de concordância no formulário antes do envio.</p>

        <h2>Por quanto tempo guardamos os dados</h2>
        <p>O site não armazena os dados em banco de dados próprio. As informações são enviadas por e-mail diretamente para a coordenação responsável pelo agendamento, ficando registradas apenas no histórico de e-mail utilizado para esse fim.</p>

        <h2>Compartilhamento</h2>
        <p>Os dados não são compartilhados com terceiros, exceto quando estritamente necessário para viabilizar a coleta junto ao Ecoponto Mary Dota.</p>

        <h2>Seus direitos</h2>
        <p>Você pode solicitar, a qualquer momento, acesso, correção ou exclusão dos seus dados, conforme previsto no art. 18 da LGPD. Para isso, entre em contato pelo e-mail <a href="mailto:yurisimoes.dev@hotmail.com">yurisimoes.dev@hotmail.com</a> ou pelo WhatsApp disponível no site.</p>
      </section>
    `;
  }
};
