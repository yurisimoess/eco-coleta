window.App = window.App || {};
App.views = App.views || {};

App.views.home = {
  render() {
    return `
      <section class="hero">
        <div class="hero-content">
          <h1>Descarte correto de lixo eletrônico na região do Mary Dota</h1>
          <p>Agende a coleta do seu e-lixo, sem sair de casa.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#/agendamento">Agendar coleta</a>
            <a class="button button-outline" href="#/artigos">Ver artigos</a>
          </div>
        </div>
        <div class="hero-media">
          <img src="assets/images/hero/hero-illustration.jpg" alt="Ilustração de uma pessoa levando uma caixa com aparelhos eletrônicos antigos até um coletor de reciclagem" width="1100" height="600">
        </div>
      </section>

      <section class="info-cards">
        <article class="card">
          <img class="card-icon" src="assets/images/icones/icone-impacto.png" alt="" width="677" height="369">
          <h2>Por que descartar corretamente?</h2>
          <p>Lixo eletrônico descartado de forma incorreta contamina o solo e a água, além de desperdiçar materiais que podem ser reaproveitados.</p>
        </article>
        <article class="card">
          <img class="card-icon" src="assets/images/icones/icone-ecoponto.png" alt="" width="677" height="369">
          <h2>O que é o Ecoponto Mary Dota?</h2>
          <p>Espaço público mantido pela Prefeitura Municipal de Bauru, destinado à coleta de pequenas quantidades de resíduos recicláveis do bairro.</p>
        </article>
        <article class="card">
          <img class="card-icon" src="assets/images/icones/icone-como-funciona.png" alt="" width="677" height="369">
          <h2>Como funciona?</h2>
          <p>Preencha o formulário de agendamento ou fale com a gente pelo WhatsApp. Simples assim.</p>
        </article>
      </section>
    `;
  }
};
