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

  // construtor de upgrades
  constructor(nome, preco, taxaPreco, cps, cpc, intervalo) {
    this.index = structuredClone(Upgrades.upgradesExistentes.length)
    this.nome = nome;
    this.preco = preco;
    this.quantidade = 0;
    this.taxaPreco = taxaPreco;
    this.cps = cps;
    this.cpc = cpc;
    this.intervalo = intervalo || 1000;

    Upgrades.upgradesExistentes.push(this);
    createIntervalUpgrade(this.index)

  }

  // função para comprar upgrade passando id de 2 elementos HTML referente a quantidade/preco do upgrade

  comprarUpgrade(index) {
    for (let i = 0; i < qntdUpgradeComprar; i++) {
      if (batatas >= this.preco) {
        batatas -= this.preco;
        this.preco = Math.floor(this.preco * this.taxaPreco);
        this.quantidade++;

        poderClique += this.cpc
        batatasPS += this.cps

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
    batatas += this.cps
    textoBancoBatatas()
    textoBatatasPorSegundo()
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

// nome, preco, taxa (>1), cps (Batata por segundo), cpc (Batata por clique)
const upgrade1 = new Upgrades("Salada de batata", 10, 1.2, 2, 0);
const upgrade2 = new Upgrades("Batata doce", 300, 1.3, 15, 0);
const upgrade3 = new Upgrades("Salgadinho de batata", 5000, 1.35, 100, 0);
const upgrade4 = new Upgrades("Purê de batata", 40000, 1.3, 250, 0);
const upgrade5 = new Upgrades("Enxada", 50, 1.4, 0, 1);
