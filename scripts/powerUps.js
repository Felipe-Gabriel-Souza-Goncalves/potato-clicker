const filaPowerups = document.getElementById("divPowerups");

class Powerup {
  static ordemPowerups = [];
  static powerupsComprados = [];
  static numComprados = 0;

  constructor(nome, descricao, preco, efeito, cumulativo) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.efeito = efeito;
    this.cumulativo = cumulativo;
    this.comprado = false;
    this.index = Powerup.ordemPowerups.length;

    Powerup.ordemPowerups.push(this);
  }

  comprarPowerup(index) {
    if (batatas > this.preco) {
      batatas -= this.preco;
      Powerup.comprado(index);
      eval(this.efeito);
    }
  }

  static comprado(index) {
    if (index == null || index == undefined) return;
    if (index >= Powerup.ordemPowerups.length) return;

    this.numComprados++;
    const powerup = Powerup.ordemPowerups[index];
    powerup.comprado = true;

    Powerup.powerupsComprados.push(powerup);
    Powerup.ordemPowerups.splice(index, 1);
    this.atualizarFront();
    esconderPowerupDetalhado();
  }

  static atualizarFront() {
    filaPowerups.innerHTML = "";

    if (Powerup.ordemPowerups.length === 0) {
      filaPowerups.innerHTML = `
        <div class="itemPowerup">Parabéns! Você comprou todos</div>
      `;
      return;
    }

    for (let i = 0; i < 3; i++) {
      if (Powerup.ordemPowerups.length <= i) {
        filaPowerups.innerHTML += `<div class="itemPowerup"></div>`;
        continue;
      }

      const powerup = Powerup.ordemPowerups[i];

      filaPowerups.innerHTML += `
        <div 
          class="itemPowerup"
          title="${powerup.descricao}"
          onclick="Powerup.ordemPowerups[${i}].comprarPowerup(${i})"
          onmouseenter="mostrarPowerupDetalhado(${i})"  
          onmouseleave="esconderPowerupDetalhado()"  
        >
          ${powerup.nome}
        </div>
      `;
    }
  }
}

const infoPowerups = {
  pw1: new Powerup(
    "Cliques também",
    `+1 cpc para cada 10 ${upgrade1.nome}`,
    250,
    `upgrade1.cpc += 0.1; poderClique += upgrade1.quantidade*upgrade1.cpc`,
  ),
  pw2: new Powerup(
    "Melhores preços",
    `taxa de aumento 5% menor para ${upgrade3.nome}`,
    700,
    `upgrade3.taxaPreco *= 0.95;`,
  ),
  pw3: new Powerup(
    "No futuro fará sentido",
    `+5 ${upgrade2.nome}`,
    1500,
    `upgrade2.quantidade +=5;
     poderClique+= upgrade2.cpc*5;
     document.getElementsByClassName("quantidadeUpgrade")[3].innerText = upgrade2.quantidade
    `,
  ),
  pw4: new Powerup(
    "Cultivo rápido",
    `${upgrade1.nome} 10% mais rápido`,
    2400,
    `upgrade1.speed = upgrade1.intervalo * 0.9`,
  ),
  pw5: new Powerup(
    "Pratos maiores",
    `+3 batatas/segundo na ${upgrade1.nome}`,
    4900,
    `upgrade1.cps += 3; batatasPS += upgrade1.quantidade * 3`,
  ),



  pw7: new Powerup(
    "Cliques doces",
    `+1 batata/clique para cada 4 ${upgrade2.nome} `,
    8000,
    `upgrade2.cpc += 0.25; poderClique += upgrade2.quantidade*upgrade2.cpc`,
  ),

  pw6: new Powerup(
    "Invista com calma",
    `USO ÚNICO - dobra o banco de batatas ATUAL`,
    50,
    `batatas *= 2; textoBancoBatatas();`,
  ),

  pw8: new Powerup(
    "Enxada afiada",
    `+3 batata/clique na ${upgrade5.nome}`,
    50,
    `upgrade5.cpc += 3; poderClique += upgrade5.quantidade * 3`,
  ),
  pw9: new Powerup(
    "Limão, sal, azeite...",
    `+5 batatas/segundo na ${upgrade1.nome}`,
    50,
    `upgrade1.cps += 5; batatasPS += upgrade1.quantidade * 5`,
  ),
  pw10: new Powerup(
    "Crocância e sabor",
    `+10 batatas/segundo na ${upgrade2.nome}`,
    50,
    `upgrade2.cps += 10; batatasPS += upgrade2.quantidade * 10`,
  ),
  pw11: new Powerup(
    "Adubo",
    `6 batatas/clique na ${upgrade5.nome}`,
    50,
    `upgrade5.cpc += 6; poderClique += upgrade5.quantidade * 6`,
  ),
};

Powerup.atualizarFront();

function mostrarPowerupDetalhado(indexPowerup) {
  const powerup = Powerup.ordemPowerups[indexPowerup];
  if (!powerup) {
    alert("Powerup não encontrado");
    return;
  }

  const nome = document.getElementById("nomePowerup");
  const preco = document.getElementById("precoPowerup");
  const descricao = document.getElementById("descricaoPowerup");

  nome.textContent = powerup.nome;
  preco.textContent = powerup.preco + " batatas";
  descricao.textContent = powerup.descricao;

  document.getElementById("infoPowerups").style.display = "block";
}

function esconderPowerupDetalhado() {
  document.getElementById("infoPowerups").style.display = "none";
}
