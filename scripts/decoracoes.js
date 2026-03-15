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
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    // TEM Q MUDARRRR
    
    
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

function efeitoPowerupLiberado(index){
  try {
    const powerupPreco = Powerup.ordemPowerups[index].preco
    const itemPowerup = document.getElementsByClassName("itemPowerup")[index]
    
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
    console.error("POWERUP", index)
    console.error(error)
  }
}

function iterarEfeitos(){
  Upgrades.upgradesExistentes.forEach((upgd) =>{
    efeitoUpgradeLiberado(upgd.index)
  })

  const itemPowerupLength = Math.min(Math.max(Powerup.ordemPowerups.length - 1), 3)
  for (let i = 0; i < itemPowerupLength; i++) {
    efeitoPowerupLiberado(i)
  }
}

function estatisticas() {
  document.getElementById("estatTempoJogo").innerHTML = contarTempoJogo(seg);
  document.getElementById("estatBatatas").innerHTML = batatas;
  document.getElementById("estatBatatasTotal").innerHTML = batataTotal;
  document.getElementById("estatBatatasPorClique").innerHTML = Math.floor(poderClique).toFixed(0);
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS();
  document.getElementById("estatCliquesTotais").innerHTML = cliques;
  document.getElementById("estatUpgradesComprados").innerHTML = Upgrades.numeroDeUpgrades;
}

function valorSelectCPS() {
  const index = document.getElementById("selectBatatasPorSegundo").value;
  let total = 0;

  if (index == "total") {
    Upgrades.upgradesExistentes
      .filter((upgd) => upgd.cps > 0)
      .forEach((upgd, i) => {
        total += upgd.quantidade * upgd.cps;
      });
  } else {
    const upgd = Upgrades.upgradesExistentes[index];
    total = upgd.quantidade * upgd.cps;
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
      spanPreco.innerText = transformNum(sumPrecos, 2, true) + " batatas"
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
  displayBatatas.textContent = `${transformNum(batatas, 2, true)} batatas`
}

function textoBatatasPorSegundo(){
  displayBatatasPS.textContent = `${transformNum(batatasPS, 2, true)} batatas por segundo`
}

function decoracaoTabelaUpgrades(indexUpgrade){
  const batatasSuficientes = Upgrades.upgradesExistentes[indexUpgrade].preco > batatas
  
  displayPrecosUpgrades[indexUpgrade].textContent = `${transformNum(batatas, 2, true)} batatas`

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

function textoEstatisticas() {
  document.getElementById("estatBatatas").innerHTML = batatas;
  document.getElementById("estatBatatasTotal").innerHTML = batataTotal;
  document.getElementById("estatBatatasPorClique").innerHTML = Math.floor(poderClique).toFixed(0);
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS();
  document.getElementById("estatCliquesTotais").innerHTML = cliques;
  document.getElementById("estatUpgradesComprados").innerHTML = Upgrades.numeroDeUpgrades;
}
