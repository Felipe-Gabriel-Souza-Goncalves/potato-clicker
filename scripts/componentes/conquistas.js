class ConquistasComponente extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
        <div id="infoConquista">
          <img id="trofeuConquista" src="" alt="troféu" />
          <div>
            <h2 id="nomeConquista">Titulo</h2>
            <p id="descricaoConquista">Descrição</p>
          </div>
        </div>

        <div id="divConquistas">
          <img src="imagens/fechar.png" class="botaoFecharDiv" width="64" alt="X"></button>
          <p>Conquistas liberadas: <span id="numeroConquistas">0/0 (0%)</span></p>
          <div id="campoConquistas"></div>
        </div>
      </div>

      <div id="campoPopupsConquistas"></div>
      <div id="fecharPopupsConquistas"></div>
    `
  }
}

customElements.define("jogo-conquistas", ConquistasComponente)