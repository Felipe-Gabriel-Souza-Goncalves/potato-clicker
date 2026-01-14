// EM PROGRESSO
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
    const filaPowerups = document.getElementById("divPowerups");
    filaPowerups.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      if (Powerup.ordemPowerups.length <= i) {
        filaPowerups.innerHTML += `<div class="itemPowerup"></div>`;
        continue;
      }

      const powerup = Powerup.ordemPowerups[i];

      filaPowerups.innerHTML += `
        <div class= "itemPowerup" title="${powerup.descricao}"
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
    500,
    `upgrade1.cpc += 0.1; poderClique += upgrade1.quantidade*upgrade1.cpc`
  ),
  pw2: new Powerup(
    "Melhores preços",
    `taxa de aumento 5% menor para ${upgrade3.nome}`,
    625,
    `upgrade3.taxaPreco *= 0.95;)`
  ),
  pw3: new Powerup(
    "Que belo negócio!",
    `+5 ${upgrade4.nome}`,
    800,
    `upgrade4.quantidade +=5;
     poderClique+= upgrade4.cpc*5;
     document.getElementById('qntUp4').innerHTML = upgrade4.quantidade;`
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
