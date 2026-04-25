// a cada 30 segundos, jogar essas informações no localStorage
function salvarTemporario() {
  document.querySelector("#popupSalvar").style.display = "block";
  setTimeout(() => (document.querySelector("#popupSalvar").style.display = "none"), 2000);


  const filteredUpgrades = Upgrades.upgradesExistentes.map(up =>{
    return up
    // return [up.quantidade || 0, up.preco || NaN]
  })

  // Cria um array de index de quais conquistas foram completas (para otimização)
  const filteredConquistas = Conquistas.conquistasTotais
    .filter(conq => conq && conq.completa == true)
    .map(conq => {return conq.index})


  // Cria um array de index de quais powerups foram comprados (para otimização)
  // CONTUDO HÁ UM PROBLEMA QUE ALGUNS EFEITOS NÃO SÃO SALVOS
  const filteredPowerups = Powerup.ordemPowerups
  .filter(pwp => pwp.comprado === true)
  .map(pwp =>{return pwp.index})

  // Cria o objeto que será salvo em localStorage
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
    },
    conquistas: filteredConquistas,
    upgrades: Upgrades.upgradesExistentes,
    powerups: filteredPowerups
  }

  // Salva o objeto
  localStorage.setItem("CCconfig", JSON.stringify(save))
}

function carregarSave(){
  try {
    if(localStorage.getItem("CCconfig") != null){
      const save = JSON.parse(localStorage.getItem("CCconfig"))
  
      // Configurações gerais
      cliques = save.geral.cliques ?? 0
      Upgrades.numeroDeUpgrades = save.geral.numeroDeUpgrades ?? 0
      SFXligado = save.geral.SFXligado ?? true
      volumeSFX.value = save.geral.volume ?? "0.5"
      seg = save.geral.seg ?? 0
  
      // Configurações sobre batatas
      batatas = save.batatas.bancoBatata ?? 0
      batataTotal = save.batatas.batataTotal ?? 0
  
      // Configurações das conquistas
      save.conquistas.forEach(index =>{
        if(index === null || index === undefined){
          console.log("Index não declarado")
          return
        }
        Conquistas.conquistasTotais[index].completa = true //Aciona setter
      })
  
      // Configurações dos upgrades
      const configUpgrades = save.upgrades
      Upgrades.upgradesExistentes.forEach((upgd, i) =>{
        if(!upgd){
          return
        }
  
        // Atribui as informações salvas
        upgd.quantidade = configUpgrades[i]._quantidade ?? upgd.quantidade // Aciona setter!!!
        upgd.preco = configUpgrades[i].preco ?? upgd.preco
        upgd.bpi = configUpgrades[i].bpi ?? upgd.bpi
        upgd.bpc = configUpgrades[i].bpc ?? upgd.bpc
        upgd.speed = configUpgrades[i].intervalo ?? upgd.intervalo
      })
  
      // Configurações dos powerups
      if(save.powerups.length !== 0){
        save.powerups.forEach(index =>{
          Powerup.ordemPowerups[index].comprado = true
        })
        Powerup.atualizarFront()
      }
    }
  } catch (error) {
    console.log("Erro ao carregar save")
    localStorage.setItem("CCconfig", localStorage.getItem("CCbackup"))
    localStorage.removeItem("CCbackup")
    carregarTudo()
    backupPopup("Não foi possível carregar o save importado")
  }
}

function backupPopup(mensagem){
  const popup = document.createElement("div")
  popup.id = "popupBackupErro"
  popup.textContent = mensagem

  document.body.appendChild(popup)

  setTimeout(() => {
    popup.remove()
  }, 5000)
}

function exportarSave(){
  const save = localStorage.getItem("CCconfig")
  if(!save) return
  console.log(save)
  
  const blob = new Blob([JSON.stringify(save)], {type: "application/json"})
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url

  const data = new Date().toLocaleDateString({language: "pt-br"})
  const hora = new Date().toLocaleTimeString({language: "pt-br"})

  link.download = "Potato clicker - save " + data + " " + hora
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function importarSave(){
    const inputImportar = document.getElementById("importar-save")
    if(!inputImportar.files) {
        alert("Nenhum arquivo selecionado")
        return
    }

    const leitor = new FileReader()
    leitor.onload = () =>{
        try {
            const reparsedSave = JSON.parse(JSON.parse(leitor.result))
            localStorage.setItem("CCbackup", localStorage.getItem("CCconfig"))
            localStorage.setItem("CCconfig", JSON.stringify(reparsedSave))
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    leitor.onerror = () => {
        alert("Erro ao importar")
    }

    leitor.readAsText(inputImportar.files[0])
}



// TESTE
// function filtrarSaves(upgrades, conquistas, powerups){
//   const filteredUpgrades = upgrades.map(up =>{
//     return up
//     // return [up.quantidade || 0, up.preco || NaN]
//   })

//   // Cria um array de index de quais conquistas foram completas (para otimização)
//   const filteredConquistas = conquistas
//     .filter(conq => conq && conq.completa == true)
//     .map(conq => {return conq.index})


//   // Cria um array de index de quais powerups foram comprados (para otimização)
//   // CONTUDO HÁ UM PROBLEMA QUE ALGUNS EFEITOS NÃO SÃO SALVOS
//   const filteredPowerups = powerups
//   .filter(pwp => pwp.comprado === true)
//   .map(pwp =>{return pwp.index})

//   return {filteredUpgrades, filteredConquistas, filteredPowerups}
// }


// function filterOldSave(oldSave){

//   const parsedOldSave = JSON.parse(oldSave)

//   const gerais = parsedOldSave.geral
//   const batatas = parsedOldSave.batatas
//   const upgrades = parsedOldSave.upgrades
//   const conquistas = parsedOldSave.conquistas
//   const powerups = parsedOldSave.powerups

//   const filteredUpgrades = upgrades.map(up =>{
//     return {index: up.index, _quantidade: up._quantidade, preco: up.preco}
//     // return [up.quantidade || 0, up.preco || NaN]
//   })

//   // Cria um array de index de quais conquistas foram completas (para otimização)
//   const filteredConquistas = conquistas
//     .filter(conq => conq && conq.completa == true)
//     .map(conq => {return conq.index})


//   // Cria um array de index de quais powerups foram comprados (para otimização)
//   // CONTUDO HÁ UM PROBLEMA QUE ALGUNS EFEITOS NÃO SÃO SALVOS
  
//   console.log("RESULTADO\n\n")
//   const factoredSave = {
//     geral: gerais,
//     batatas, 
//     upgrades: filteredUpgrades,
//     conquistas: filteredConquistas,
//     powerups: [2]
//   }

//   console.log(factoredSave)
//   return factoredSave
// }