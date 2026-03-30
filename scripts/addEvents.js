document.addEventListener("DOMContentLoaded", () => {

  document.documentElement.addEventListener("keydown", (e) =>{
    if(e.key === "Escape" && randomStats.elementOpened != null){
      abrirSecao()
    }
    // if("batata"[randomStats.letras.length] === e.key.toLowerCase()){
    //   randomStats.letras.push(e.key)
    //   console.log(randomStats.letras)
    // } else{
    //   randomStats.letras = []
    // }
  })

  // clicar na batata
  const imagemBatata = document.getElementById("imagemBatata");
  if (imagemBatata) {
    imagemBatata.addEventListener("click", clicarNaBatata);
  }

  // navegação das seções
  const navImgs = document.querySelectorAll(".navSecoes img");

  if (navImgs[0]) { navImgs[0].addEventListener("click", () => {abrirSecao("divConfiguracoes", "", [configAberta]);});}
  if (navImgs[1]) { navImgs[1].addEventListener("click", () => {abrirSecao("divEstatisticas", "", [estatisticaAberta, estatisticas]);});}
  if (navImgs[2]) { navImgs[2].addEventListener("click", () => {abrirSecao("divConquistas", "", [abriuConquista]);});}

  // botões de quantidade de upgrades
  const botoesUpgrade = document.querySelectorAll(".botaoMudarNumUpgrade");

  botoesUpgrade.forEach((botao, index) => {
    if(botao.parentElement.classList.contains("nomeUpgrade")) return
    botao.addEventListener("click", () => {
      mudarNumUpgrades(index);
    });
  });

  // botões de fechar div
  const botoesFechar = document.querySelectorAll(".botaoFecharDiv");

  botoesFechar.forEach(botao => {
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

  // const animacaoSalvar = document.getElementById("popupSalvar").querySelector("img")
  // if(animacaoSalvar){
  //   animacaoSalvar.addEventListener("click", () =>{
      
  //   })
  // }




});