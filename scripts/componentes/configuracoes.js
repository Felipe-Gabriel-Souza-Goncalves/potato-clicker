class ConfiguracoesComponente extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="divConfiguracoes">
        <img src="imagens/fechar.png" class="botaoFecharDiv" width="64" alt="X"></button>

        <div class="opcoesConfiguracao">
          <button id="botaoReiniciarProgresso">REINICIAR PROGRESSO</button>
          <br /><br />

          <label for="volumeSFX">Volume SFX</label>
          <input type="range" id="volumeSFX" value="0.5" min="0" max="1" step="0.01" />
          <span id="configVolume">50%</span>
          <br />

          <input type="checkbox" id="toggleSFX">
          <label for="toggleSFX">Desligar efeitos sonoros</label>

          <h2 id="textoSalvarManualmente">
            Salvar manualmente:
            <img width="40px" src="imagens/grown save.png" alt="Salvar"/>
          </h2>

          <button id="buttonExportSave">Exportar arquivo do jogo</button>
          <button id="buttonImportSave">Importar arquivo do jogo</button>
          <input type="file" id="importar-save" style="display: none;">
          
          <a id="voltarRepo" href="https://github.com/Felipe-Gabriel-Souza-Goncalves/potato-clicker/">Voltar para o repositório</a>
        </div>
      </div>
    `
  }
}

customElements.define("jogo-configuracoes", ConfiguracoesComponente)