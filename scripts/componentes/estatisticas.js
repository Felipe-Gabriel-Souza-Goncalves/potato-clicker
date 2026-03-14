class EstatisticasComponente extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="divEstatisticas">
        <img src="imagens/fechar.png" class="botaoFecharDiv" width="64" alt="X"></button>

        <div class="estatRun">
          <h2>Tempo de jogo: <span id="estatTempoJogo"></span></h2>
          <h2>Batatas atuais: <span id="estatBatatas">0</span></h2>
          <h2>Batatas totais: <span id="estatBatatasTotal">0</span></h2>
          <h2>Batatas por clique: <span id="estatBatatasPorClique">1</span></h2>

          <h2>
            Batatas por segundo:
            <select name="selectBatatasPorSegundo" id="selectBatatasPorSegundo">
              <option value="total">Total</option>
            </select>
            <span id="estatBatatasPorSegundo">0</span>
          </h2>

          <h2>Cliques: <span id="estatCliquesTotais">0</span></h2>
          <h2>Upgrades comprados: <span id="estatUpgradesComprados">0</span></h2>
        </div>
      </div>`;
  }
}

customElements.define("jogo-estatisticas", EstatisticasComponente)