window.App = window.App || {};
App.views = App.views || {};

App.views.articles = {
  // Conteúdo inicial — revisar/substituir com dados reais do Ecoponto/Prefeitura (ver PROJECT.md, seção 9).
  data: [
    {
      title: 'O que é considerado lixo eletrônico?',
      body: 'Pilhas, baterias, celulares, computadores, cabos e eletrodomésticos — qualquer aparelho que funcione com eletricidade ou bateria é considerado lixo eletrônico ao ser descartado.',
      image: 'assets/images/artigos/artigo-1.jpg',
      alt: 'Pilhas, celulares antigos e cabos organizados sobre uma mesa'
    },
    {
      title: 'Os riscos do descarte incorreto',
      body: 'Metais pesados presentes em componentes eletrônicos podem contaminar o solo e os lençóis freáticos quando descartados junto ao lixo comum, afetando a saúde da comunidade.',
      image: 'assets/images/artigos/artigo-2.jpg',
      alt: 'Fios elétricos saindo de um solo rachado, representando a contaminação causada pelo descarte incorreto'
    },
    {
      title: 'O que o Ecoponto Mary Dota aceita',
      body: 'O Ecoponto recebe pequenas quantidades de resíduos eletrônicos e recicláveis dos moradores do bairro, de forma gratuita.',
      image: 'assets/images/artigos/artigo-3.jpg',
      alt: 'Coletores de resíduos recicláveis e de eletrônicos em uma praça pública'
    },
    {
      title: 'Como preparar seu e-lixo para a coleta',
      body: 'Sempre que possível, remova baterias e pilhas separadamente e mantenha os aparelhos protegidos até o dia da coleta.',
      image: 'assets/images/artigos/artigo-4.jpg',
      alt: 'Mãos embalando um celular antigo com cuidado antes do descarte'
    }
  ],
  render() {
    const cards = this.data
      .map(
        (item) => `
      <article class="card article-card">
        <img src="${item.image}" alt="${item.alt}" width="640" height="357">
        <h2>${item.title}</h2>
        <p>${item.body}</p>
      </article>
    `
      )
      .join('');

    return `
      <section class="page-header">
        <h1>Artigos</h1>
        <p>Dicas e informações sobre descarte e reciclagem de lixo eletrônico.</p>
      </section>
      <section class="articles-grid">
        ${cards}
      </section>
    `;
  }
};
