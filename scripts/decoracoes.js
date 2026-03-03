function decoracao(obj, idPreco) {
  
  const elementPreco = document.getElementById(idPreco)
  elementPreco.title = transformNum(obj.preco, 2, true) + ` batatas necessários para comprar`;
  
  if (obj.preco > batatas) {
    elementPreco.parentElement.classList.add("upgradeBloqueado")
  } else if(elementPreco.parentElement.classList.contains("upgradeBloqueado")) {
    elementPreco.parentElement.classList.remove("upgradeBloqueado")
  }
}

function estatisticas() {
  document.getElementById("estatBatatas").innerHTML = batatas;
  document.getElementById("estatBatatasTotal").innerHTML = BatataTotal;
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
    alterarTextosPrecos(upgd.preco, upgd.taxaPreco, (i+1))
  })
}

function alterarTextosPrecos(preco, taxaPreco, i) {
    let sumPrecos = preco
    for (let j = 1; j < qntdUpgradeComprar; j++) {
        preco = Math.floor(preco * taxaPreco);
        sumPrecos+= preco
    }

    document.getElementById("precoUp"+i).innerText = transformNum(sumPrecos, 2, true) + " batatas"
    decoracao({preco: sumPrecos}, "precoUp"+i)
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
  displayBatatasPS = `${transformNum(batatas, 2, true)} batatas por segundo`
}

function precoComprarMuitos(precoOriginal, quantidade, taxa){
  let novoPreco;
  
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

  // batatasSuficientes === false ? displayPrecosUpgrades.classList.add("precoUpgradeBloqueado") : 
  //                                displayPrecosUpgrades.classList.remove("precoUpgradeBloqueado") 

  // batatasSuficientes === false ? buttonsComprarUpgrades.classList.add("botaoUpgradeBloqueado") :
  //                                buttonsComprarUpgrades.classList.remove("botaoUpgradeBloqueado") 


}

function textoEstatisticas() {
  document.getElementById("estatBatatas").innerHTML = batatas;
  document.getElementById("estatBatatasTotal").innerHTML = BatataTotal;
  document.getElementById("estatBatatasPorClique").innerHTML = Math.floor(poderClique).toFixed(0);
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS();
  document.getElementById("estatCliquesTotais").innerHTML = cliques;
  document.getElementById("estatUpgradesComprados").innerHTML = Upgrades.numeroDeUpgrades;
}
