// Aguarda a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todas as seções e links do menu
  const sections = document.querySelectorAll(".spa-section");
  const links = document.querySelectorAll(".nav-link");

  // Função para esconder todas as seções
  function esconderTodas() {
    sections.forEach(section => {
      section.style.display = "none";
    });
  }

  // Função para mostrar uma seção específica
  function mostrarSecao(id) {
    esconderTodas(); // Esconde as outras
    const secao = document.getElementById(id);
    if (secao) {
      secao.style.display = "block"; // Mostra a selecionada
    }
  }

  // Quando o usuário clica em um link do menu
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Impede o recarregamento da página
      const destino = link.getAttribute("href").replace("#", ""); // Pega o id (ex: 'projetos')
      mostrarSecao(destino); // Mostra a seção escolhida
    });
  });

  // Quando o site carrega, verifica se existe uma hash (#)
  const hash = window.location.hash.replace("#", "") || "home";
  mostrarSecao(hash); // Mostra a seção correta
});
