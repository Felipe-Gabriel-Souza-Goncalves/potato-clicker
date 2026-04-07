function efeitoUpgradeLiberado(index) {
  try {
    const upgradePreco = Upgrades.upgradesExistentes[index].preco
    const upgradeTaxa = Upgrades.upgradesExistentes[index].taxaPreco
    const itemUpgrade = document.getElementsByClassName("itemUpgrade")[index]
    
    // Se o preço ou elemento não existir, retorna
    if(!upgradePreco || !itemUpgrade){
      console.error("Upgrade de index:", index, " não conseguiu mudar aparencia do texto" )
      console.error("preco:", upgradePreco, "elemento:", itemUpgrade)
      return
    }

    // TEM Q MUDARRRR
    // Puts, esqeueci pq
        
    // Muda a aparência a depender se for suficiente ou não
    if(precoComMultiplicador(upgradePreco, upgradeTaxa) > batatas){
      itemUpgrade.classList.add("upgradeBloqueado")
    } else {
      if(!itemUpgrade.classList.contains("upgradeBloqueado")) return
      itemUpgrade.classList.remove("upgradeBloqueado")
    }
  } catch (error) {
    console.error(error)
  }
  

}

function efeitoPowerupLiberado(indexPwp, indexEl){
  try {
    const powerupPreco = Powerup.ordemPowerups[indexPwp].preco
    const itemPowerup = document.getElementsByClassName("itemPowerup")[indexEl]
    
    // Se o preço ou elemento não existir, retorna
    if(!powerupPreco || !itemPowerup){
      console.error("Powerup index:", index, " não conseguiu mudar aparencia do texto" )
      console.error("preco:", powerupPreco, "elemento:", itemPowerup)
      return
    }
  
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    
    
    // Muda a aparência a depender se for suficiente ou não
    if(powerupPreco > batatas){
      itemPowerup.classList.add("powerupBloqueado")
    } else {
      if(!itemPowerup.classList.contains("powerupBloqueado")) return
      itemPowerup.classList.remove("powerupBloqueado")
    }
  } catch (error) {
    console.error("POWERUP", indexPwp, indexEl)
    console.error(error)
  }
}

function iterarEfeitos(){
  Upgrades.upgradesExistentes.forEach((upgd) =>{
    efeitoUpgradeLiberado(upgd.index)
  })

  let proximosPowerups = []
  let i = 0;
  while(i < Powerup.ordemPowerups.length && proximosPowerups.length < 3){
    if(Powerup.ordemPowerups[i].comprado == false){
      proximosPowerups.push(i)
    }
    i++
  }

  proximosPowerups.forEach((indexPwp, indexEl) => {efeitoPowerupLiberado(indexPwp, indexEl)})
  // let contador = 0
  // for(let i = 0; i < Powerup.ordemPowerups.length; i++){
  //   if(contador === 3) break
  //   if(Powerup.ordemPowerups[i].comprado == false){
  //     efeitoPowerupLiberado(i)
  //     contador++
  //   }
  // }
}

function estatisticas() {
  if(randomStats.elementOpened !== "estatistica") return
  document.getElementById("estatTempoJogo").innerText = contarTempoJogo(seg);
  document.getElementById("estatBatatas").innerText = batatas;
  document.getElementById("estatBatatasTotal").innerText = batataTotal;
  document.getElementById("estatBatatasPorClique").innerText = Math.floor(poderClique).toFixed(0);
  document.getElementById("estatBatatasPorSegundo").innerText = valorSelectCPS();
  document.getElementById("estatCliquesTotais").innerText = cliques;
  document.getElementById("estatUpgradesComprados").innerText = Upgrades.numeroDeUpgrades;
}

function valorSelectCPS() {
  const index = document.getElementById("selectBatatasPorSegundo").value;
  let total = 0;

  if (index == "total") {
    Upgrades.upgradesExistentes
      .filter((upgd) => upgd.bpi > 0)
      .forEach((upgd, i) => {
        total += upgd.quantidade * upgd.bpi;
      });
  } else {
    const upgd = Upgrades.upgradesExistentes[index];
    total = upgd.quantidade * upgd.bpi;
  }

  return total;
}

var qntdUpgradeComprar = 1;

function mudarNumUpgrades(id) {
  switch (id) {
    case 0:
      qntdUpgradeComprar = 1;
      break;
    case 1:
      qntdUpgradeComprar = 10;
      break;
    case 2:
      qntdUpgradeComprar = 100;
      break;
  }

  for (let i = 0; i < document.getElementsByClassName("botaoMudarNumUpgrade").length; i++) {
    document.getElementsByClassName("botaoMudarNumUpgrade")[i].classList.remove("botaoAtivo");

    if (i == id) {
      document.getElementsByClassName("botaoMudarNumUpgrade")[i].classList.add("botaoAtivo");
    }
  }

  Upgrades.upgradesExistentes.forEach((upgd, i) =>{
    alterarTextosPrecos(upgd.preco, upgd.taxaPreco, (i))
    efeitoUpgradeLiberado(i)
  })
}

function precoComMultiplicador(preco, taxaPreco){
  let sumPrecos = preco
  for (let j = 1; j < qntdUpgradeComprar; j++) {
      preco = Math.floor(preco * taxaPreco);
      sumPrecos+= preco
  } 
  return sumPrecos
}

function alterarTextosPrecos(preco, taxaPreco, i) {
    const sumPrecos = precoComMultiplicador(preco, taxaPreco)

    try {
      const spanPreco = document.getElementsByClassName("precoUpgrade")[i]
      if(spanPreco === undefined) return
      spanPreco.innerText = sufixarNum(sumPrecos, 2, true) + " batatas"
    } catch (error) {
      console.log("index:", i, "\n", error)
    }
}


const textoBatatas = document.getElementById("batatas")
const textoBatatasPS = document.getElementById("batatasPS")

const displayPrecosUpgrades = document.getElementsByClassName(".precosUpgrades")
const buttonsComprarUpgrades = document.getElementsByClassName(".botoesUpgrades")

function mudarUI(){
  textoBancoBatatas()
}

function textoBancoBatatas(){
  displayBatatas.textContent = `${sufixarNum(batatas, 2, true)} batatas`
}

function textoBatatasPorSegundo(){
  displayBatatasPS.textContent = `${sufixarNum(batatasPS, 2, true)} batatas por segundo`
}

function decoracaoTabelaUpgrades(indexUpgrade){
  const batatasSuficientes = Upgrades.upgradesExistentes[indexUpgrade].preco > batatas
  
  displayPrecosUpgrades[indexUpgrade].textContent = `${sufixarNum(batatas, 2, true)} batatas`

  if(batatasSuficientes){
    displayPrecosUpgrades[indexUpgrade].classList.remove("precoUpgradeBloqueado") 
    buttonsComprarUpgrades[indexUpgrade].classList.remove("botaoUpgradeBloqueado") 
  } else{
    displayPrecosUpgrades[indexUpgrade].classList.add("precoUpgradeBloqueado") 
    buttonsComprarUpgrades[indexUpgrade].classList.add("botaoUpgradeBloqueado") 

    const batatasNecessarias = Upgrades.upgradesExistentes[indexUpgrade].preco - batatas
    buttonsComprarUpgrades[indexUpgrade].title = batatasNecessarias + " batatas necessárias para compra"
  }
}