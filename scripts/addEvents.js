document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && randomStats.elementOpened != null) {
      abrirSecao();
    }
  });

  // clicar na batata
  const imagemBatata = document.getElementById("imagemBatata");
  if (imagemBatata) {
    imagemBatata.addEventListener("click", clicarNaBatata);
  }

  // navegação das seções
  const navImgs = document.querySelectorAll(".navSecoes img");

  if (navImgs[0]) {
    navImgs[0].addEventListener("click", () => {abrirSecao("divConfiguracoes", "", [configAberta]);});
    navImgs[0].addEventListener("mouseenter", () => {hoverAba(0)});
    navImgs[0].addEventListener("mouseleave", () => {hoverAba()});
  }
  if (navImgs[1]) {
    navImgs[1].addEventListener("click", () => {abrirSecao("divEstatisticas", "", [estatisticaAberta, estatisticas]);});
    navImgs[1].addEventListener("mouseenter", () => {hoverAba(1)});
    navImgs[1].addEventListener("mouseleave", () => {hoverAba()});
  }
  if (navImgs[2]) {
    navImgs[2].addEventListener("click", () => {abrirSecao("divConquistas", "", [abriuConquista]);});
    navImgs[2].addEventListener("mouseenter", () => {hoverAba(2)});
    navImgs[2].addEventListener("mouseleave", () => {hoverAba()});
  }

  const navImgSkin = document.querySelector("img[src='imagens/skins.png']");
  if(navImgSkin){
    navImgSkin.addEventListener("click", () => {abrirSecao("divSkins", "", []);});
    // navImgSkin.addEventListener("mouseenter", () => {hoverAba(1)});
    // navImgSkin.addEventListener("mouseleave", () => {hoverAba()});
  }




  // botões de quantidade de upgrades
  const botoesUpgrade = document.querySelectorAll(".botaoMudarNumUpgrade");

  botoesUpgrade.forEach((botao, index) => {
    if (botao.parentElement.classList.contains("nomeUpgrade")) return;
    botao.addEventListener("click", () => {
      mudarNumUpgrades(index);
    });
  });

  // botões de fechar div
  const botoesFechar = document.querySelectorAll(".botaoFecharDiv");

  botoesFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
      abrirSecao();
    });
  });

  // reiniciar progresso
  const botaoReiniciar = document.getElementById("botaoReiniciarProgresso");
  if (botaoReiniciar) {
    botaoReiniciar.addEventListener("click", apagarProgresso);
  }

  // volume SFX
  const volumeSFX = document.getElementById("volumeSFX");
  if (volumeSFX) {
    volumeSFX.addEventListener("input", audioBatata);
  }

  // toggle SFX
  const toggleSFX = document.getElementById("toggleSFX");
  if (toggleSFX) {
    toggleSFX.addEventListener("change", () => {
      SFXligado = !SFXligado;
      audioBatata();
    });
  }

  // salvar manualmente
  const salvarManual = document.getElementById("textoSalvarManualmente");
  if (salvarManual) {
    salvarManual.addEventListener("click", () => {
      salvarTemporario();
      randomStats.saveManual++;
    });
  }

  // Escolha de arquivo para importar save
  const inputImportarSave = document.getElementById("importar-save");
  if (inputImportarSave) {
    inputImportarSave.addEventListener("change", importarSave);
  }

  // Botão para criar JSON do save
  const buttonExportSave = document.getElementById("buttonExportSave");
  if (buttonExportSave) {
    buttonExportSave.addEventListener("click", exportarSave);
  }

  // Botão para acionar input de anexar arquivo
  const buttonImportSave = document.getElementById("buttonImportSave");
  if (buttonImportSave) {
    buttonImportSave.addEventListener("click", () => {
      inputImportarSave.click();
    });
  }

  document.getElementById("selectBatatasPorSegundo").addEventListener("change", () => {
    document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS();
  });
});
