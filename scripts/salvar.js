// a cada 30 segundos, jogar essas informações no localStorage
function salvarTemporario() {
  document.querySelector("#popupSalvar").style.display = "block";
  setTimeout(() => (document.querySelector("#popupSalvar").style.display = "none"), 2000);

  const save = {
    geral: {
      cliques: cliques,
      numeroDeUpgrades: Upgrades.numeroDeUpgrades,
      SFXligado: SFXligado,
      volume: document.getElementById("volumeSFX").value,
    },
    batatas: {
      bancoBatata: batatas,
      BatataTotal: BatataTotal,
      BatataPS: batatasPS,
      poderClique: poderClique,
    },
    conquistas: Conquistas.conquistasLiberadas,
    upgrades: Upgrades.upgradesExistentes
  }

  localStorage.setItem("CCconfig", JSON.stringify(save))
}


function carregarSave(){
  if(localStorage.getItem("CCconfig") != null){
    const save = JSON.parse(localStorage.getItem("CCconfig"))

    // Configurações gerais
    cliques = save.geral.cliques
    Upgrades.numeroDeUpgrades = save.geral.numeroDeUpgrades
    SFXligado = save.geral.SFXligado
    document.getElementById("volumeSFX").value = save.geral.volume

    // Configurações sobre batatas
    batatas = save.batatas.bancoBatata
    BatataTotal = save.batatas.BatataTotal
    batatasPS = save.batatas.BatataPS
    poderClique = save.batatas.poderClique

    // Configurações das conquistas
    Conquistas.numeroConquistasLiberadas = save.conquistas.length
    Conquistas.conquistasLiberadas = save.conquistas
    Conquistas.conquistasLiberadas.forEach(c =>{
      Conquistas.conquistasTotais[c.index].completa = true
    })

    // Configurações dos upgrades
    const configUpgrades = save.upgrades
    Upgrades.upgradesExistentes.forEach((upgd, i) =>{
      upgd.quantidade = configUpgrades[i].quantidade
      upgd.preco = configUpgrades[i].preco
    })

  }
}

carregarSave()

function carregarTextosPrecos(){
  Upgrades.upgradesExistentes.forEach((upgd, i) =>{
    document.getElementById(`qntUp`+ (i+1)).innerText = upgd.quantidade 
    document.getElementById(`precoUp`+ (i+1)).innerText = upgd.preco + " batatas"
  })
}
