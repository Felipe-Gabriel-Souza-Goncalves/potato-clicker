const upgradesInterval = []

// classe para upgrades
class Upgrades {
  static numeroDeUpgrades = 0;
  static upgradesExistentes = [];

  // Contar todos os upgrades criados quando o programa for rodado
  static contarUpgrades(qntd) {
    this.numeroDeUpgrades++;
  }

  // TESTES
  // construtor de upgrades
  constructor(nome, preco, taxaPreco, bpi, bpc, intervalo) {
    this.index = Upgrades.upgradesExistentes.length
    this.nome = nome;
    this.preco = preco;
    this.taxaPreco = taxaPreco;
    this._quantidade = 0;
    this.bpi = bpi; // Batata por intervalo
    this.bpc = bpc; // Batata por clique
    this.intervalo = intervalo || 1000;

    Upgrades.upgradesExistentes.push(this);
    createIntervalUpgrade(this.index)

  }

  set speed(newValue){
    this.intervalo = newValue
    upgradesInterval[this.index].timeNeeded = this.intervalo 
  }

  set quantidade(newQntd){
    // Calcula a quantidade que será adicionada: quantidadeNova - quantidadeAntiga
    const diffQntd = newQntd - this._quantidade

    // Soma os novos bpc e bpi
    poderClique += this.bpc * diffQntd
    batatasPS += this.bpi * diffQntd

    // Atualiza o front-end
    this._quantidade = newQntd
    if(document.getElementsByClassName("quantidadeUpgrade")[this.index]){
      document.getElementsByClassName("quantidadeUpgrade")[this.index].innerText = this._quantidade
    }

    // Atualiza 
    alterarTextosPrecos(this.preco, this.taxaPreco, this.index)
  }

  get quantidade(){
    return this._quantidade
  }
  

  comprarUpgrade(index) {
    for (let i = 0; i < qntdUpgradeComprar; i++) {
      if (batatas >= this.preco) {
        batatas -= this.preco;
        this.preco = Math.floor(this.preco * this.taxaPreco);
        this.quantidade++;

        Upgrades.contarUpgrades();
        alterarTextosPrecos(this.preco, this.taxaPreco, index)
      } else {
        randomStats.tentativasComprar++
        break;
      }

      displayBatatas.innerHTML = sufixarNum(batatas, 2, true) + " batatas";
      efeitoUpgradeLiberado(this.index)
    }
  }

  acrescentarBatatasPassivas(){
    batatas += this.bpi * this._quantidade
    batataTotal += this.bpi * this._quantidade
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
    infoBpi.innerText = `${upgd.bpi} | ${Number((upgd.bpi * upgd.quantidade).toFixed(2))}`
    infoBpc.innerText = `${upgd.bpc} | ${Number((upgd.bpc * upgd.quantidade).toFixed(2))}`

    containerInfoUpgrade.style.display = "block"
  }

  static esconderInfoUpgrade(){
    document.querySelector("jogo-upgrades > div:has(#infoUpgrade)").style.display = "none"
  }
}

// Cria os intervalos dos quais os upgrades criarão batatas
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
