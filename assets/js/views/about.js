window.App = window.App || {};
App.views = App.views || {};

App.views.about = {
  render() {
    return `
      <section class="page-header">
        <h1>Sobre o projeto</h1>
        <p>Este site é um projeto de extensão universitária do curso de Análise e Desenvolvimento de Sistemas da UNINTER, em parceria com o Ecoponto Mary Dota e a Prefeitura Municipal de Bauru/SP.</p>
      </section>
      <section class="about-content">
        <p>O objetivo é facilitar o agendamento de coletas de lixo eletrônico para os moradores do Núcleo Habitacional Mary Dota, além de sensibilizar a comunidade sobre a importância do descarte correto para o meio ambiente e para a saúde pública.</p>
        <img class="about-illustration" src="assets/images/hero/about-illustration.jpg" alt="Ilustração representando a conexão entre a universidade e a comunidade do bairro, com um símbolo de reciclagem de eletrônicos" width="900" height="491">
      </section>
    `;
  }
};
