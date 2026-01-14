function decoracao(obj, idPreco) {
  
  const elementPreco = document.getElementById(idPreco)
  elementPreco.title = obj.preco + ` batatas necessários para comprar`;
  
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

    document.getElementById("precoUp"+i).innerText = sumPrecos + " batatas"
    decoracao({preco: sumPrecos}, "precoUp"+i)
}
