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
    // Upgrades.contarUpgrades()
  }

  // função para comprar upgrade passando id de 2 elementos HTML referente a quantidade/preco do upgrade

  comprarUpgrade(idQntd, idPreco, index) {
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

      displayBatatas.innerHTML = transformNum(batatas, 2, true) + " Batatas";

      // mudar o html dos elementos passados no parametro
      document.getElementById(idQntd).innerHTML = this.quantidade;
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

function carregarTabela() {
  const tabelaProdutos = document.querySelector("#listaProdutos");
  tabelaProdutos.innerHTML = "";

  Upgrades.upgradesExistentes.forEach((upgrade, i) => {
    const index = i + 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="nomeUpgrade">
            <button 
              class="botaoMudarNumUpgrade" 
              onclick="upgrade${index}.comprarUpgrade('qntUp${index}', 'precoUp${index}', ${index})"
              onmouseenter=""
              onmouseleave=""
            >
                ${upgrade.nome}
            </button>
        </td>
        <td class="qntUp" id="qntUp${index}">${upgrade.quantidade}</td>
        <td class="precoCompra" class="upgradeBloqueado">
          <h2 id="precoUp${index}">${upgrade.preco} batatas</h2>
        </td>
        `;

    tabelaProdutos.appendChild(tr);
  });
}

// nome, preco, taxa (>1), cps (Batata por segundo), cpc (Batata por clique)
const upgrade1 = new Upgrades("+1 Batata/seg", 5, 1.2, 1, 0);
const upgrade2 = new Upgrades("+5 Batata/seg", 25, 1.42, 5, 0);
const upgrade3 = new Upgrades("+10 Batata/seg", 200, 1.5, 10, 0);
const upgrade4 = new Upgrades("+1 Batata/click", 1200, 1.3, 0, 1);

