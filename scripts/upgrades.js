const upgradesInterval = []

// classe para upgrades
class Upgrades {
  static numeroDeUpgrades = 0;
  static upgradesExistentes = [];

  // Contar todos os upgrades criados quando o programa for rodado
  static contarUpgrades() {
    this.numeroDeUpgrades++;
  }

  set speed(newValue){
    this.intervalo = newValue
    upgradesInterval[this.index].timeNeeded = this.intervalo 
  }

  // TESTES
  // construtor de upgrades
  constructor(nome, preco, taxaPreco, bpi, bpc, intervalo) {
    this.index = structuredClone(Upgrades.upgradesExistentes.length)
    this.nome = nome;
    this.preco = preco;
    this.quantidade = 0;
    this.taxaPreco = taxaPreco;
    this.bpi = bpi; // Batata por intervalo
    this.bpc = bpc; // Batata por clique
    this.intervalo = intervalo || 1000;

    Upgrades.upgradesExistentes.push(this);
    createIntervalUpgrade(this.index)

  }

  comprarUpgrade(index) {
    for (let i = 0; i < qntdUpgradeComprar; i++) {
      if (batatas >= this.preco) {
        batatas -= this.preco;
        this.preco = Math.floor(this.preco * this.taxaPreco);
        this.quantidade++;

        poderClique += this.bpc
        batatasPS += this.bpi

        Upgrades.contarUpgrades();
        alterarTextosPrecos(this.preco, this.taxaPreco, index)
      } else {
        randomStats.tentativasComprar++
        break;
      }

      displayBatatas.innerHTML = transformNum(batatas, 2, true) + " batatas";
      document.getElementsByClassName("quantidadeUpgrade")[index].innerText = this.quantidade
      efeitoUpgradeLiberado(this.index)
    }
  }

  acrescentarBatatasPassivas(){
    batatas += this.bpi
    batataTotal += this.bpi
    textoBancoBatatas()
    textoBatatasPorSegundo()
  }

  static mostrarInfoUpgrade(index){
    const containerInfoUpgrade = document.querySelector("jogo-upgrades > div:has(#infoUpgrade)")
    const infoUpgrade = document.getElementById("infoUpgrade")
    

    const infoNome = infoUpgrade.querySelector("span#infoNome")
    const infoBpi = infoUpgrade.querySelector("p #infoBpi")
    const infoBpc = infoUpgrade.querySelector("p #infoBpc")
    const upgd = Upgrades.upgradesExistentes[index]
    infoNome.innerText = upgd.nome
    infoBpi.innerText = `${upgd.bpi} | ${upgd.bpi * upgd.quantidade}`
    infoBpc.innerText = `${upgd.bpc} | ${upgd.bpc * upgd.quantidade}`

    containerInfoUpgrade.style.display = "block"
  }

  static esconderInfoUpgrade(){
    document.querySelector("jogo-upgrades > div:has(#infoUpgrade)").style.display = "none"
  }
}

function createIntervalUpgrade(index){
  const upgrade = Upgrades.upgradesExistentes[index]
  
  upgradesInterval.push({
    actions: [upgrade.acrescentarBatatasPassivas],
    timeNeeded: upgrade.intervalo,
    accumulator: 0
  })
}

// nome, preco, taxa (>1), bpi (Batata por intervalo), bpc (Batata por clique)
const upgrade1 = new Upgrades("Salada de batata", 10, 1.2, 2, 0);
const upgrade2 = new Upgrades("Batata doce", 300, 1.3, 15, 0);
const upgrade3 = new Upgrades("Salgadinho de batata", 5000, 1.3, 100, 0);
const upgrade4 = new Upgrades("Purê de batata", 40000, 1.3, 250, 0);
const upgrade5 = new Upgrades("Enxada", 50, 1.1, 0, 1);
