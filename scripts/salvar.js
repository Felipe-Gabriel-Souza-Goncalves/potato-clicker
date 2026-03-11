// a cada 30 segundos, jogar essas informações no localStorage
function salvarTemporario() {
  document.querySelector("#popupSalvar").style.display = "block";
  setTimeout(() => (document.querySelector("#popupSalvar").style.display = "none"), 2000);

  const save = {
    geral: {
      cliques: cliques,
      numeroDeUpgrades: Upgrades.numeroDeUpgrades,
      SFXligado: SFXligado,
      volume: volumeSFX.value,
      seg: seg
    },
    batatas: {
      bancoBatata: batatas,
      batataTotal: batataTotal,
      BatataPS: batatasPS,
      poderClique: poderClique,
    },
    conquistas: Conquistas.conquistasLiberadas,
    upgrades: Upgrades.upgradesExistentes,
    powerups: {
      pendentes: Powerup.ordemPowerups,
      desbloqueados: Powerup.powerupsComprados
    }
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
    volumeSFX.value = save.geral.volume
    seg = save.geral.seg

    // Configurações sobre batatas
    batatas = save.batatas.bancoBatata
    batataTotal = save.batatas.batataTotal
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
      if(!upgd){
        return
      }
      upgd.quantidade = configUpgrades[i].quantidade
      upgd.preco = configUpgrades[i].preco
    })

    if(save.powerups.desbloqueados.length !== 0){
      const backupPendentes = structuredClone(Powerup.ordemPowerups)

      try {

        Powerup.ordemPowerups = []
        Powerup.powerupsComprados = []
        Powerup.atualizarFront()

        // Esse código não merece ser comentado, tá horrível e espero q vc nunca descubra oq eu fiz
        save.powerups.desbloqueados.forEach(powerup =>{
          const {nome, descricao, preco, efeito, cumulativo} = {...powerup}
          const novoPowerup = new Powerup(nome, descricao, preco, efeito)
          novoPowerup.comprado = true;
          Powerup.powerupsComprados.push(novoPowerup)
          Powerup.ordemPowerups.pop()
        })

        
        save.powerups.pendentes.forEach(powerup =>{
          const {nome, descricao, preco, efeito, cumulativo} = {...powerup}
          const novoPowerup = new Powerup(nome, descricao, preco, efeito)
        })

        Powerup.atualizarFront()
      } catch (error) {
        console.log(error)
        Powerup.ordemPowerups = backupPendentes
        
      }

    }

  }
}

carregarSave()

function carregarTextosPrecos(){
  Upgrades.upgradesExistentes.forEach((upgd, i) =>{
    document.getElementById(`qntUp`+ (i+1)).innerText = upgd.quantidade 
    document.getElementById(`precoUp`+ (i+1)).innerText = upgd.preco + " batatas"
  })
}
