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
    if (batatas >= this.preco) {
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

    this.atualizarFront();
    esconderPowerupDetalhado();
  }

  static atualizarFront() {
    filaPowerups.innerHTML = "";

    const restantes = Powerup.ordemPowerups.filter(pwp => pwp.comprado === false)

    if (restantes.length === 0) {
      filaPowerups.innerHTML = `
        <div class="itemPowerup">Parabéns! Você comprou todos</div>
      `;
      return;
    }

    for (let i = 0; i < 3; i++) {
      if (restantes.length <= i) {
        filaPowerups.innerHTML += `<div class="itemPowerup"></div>`;
        continue;
      }

      const powerup = restantes[i];
      const clickAction = `Powerup.ordemPowerups[${powerup.index}].comprarPowerup(${powerup.index})`

      filaPowerups.innerHTML += `
        <div 
          class="itemPowerup powerupBloqueado"
          title="${powerup.descricao}"
          onclick="${clickAction}"
          onmouseenter="mostrarPowerupDetalhado(${powerup.index})"  
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
    "Cliques saudáveis",
    `+1 bpc para cada 4 ${upgrade1.nome}`,
    250,
    `upgrade1.bpc += 0.25; poderClique += upgrade1.quantidade*upgrade1.bpc`,
  ),
  pw2: new Powerup(
    "Melhores preços",
    `taxa de aumento de preço 5% menor para ${upgrade3.nome}`,
    700,
    `upgrade3.taxaPreco *= 0.95;`,
  ),
  pw3: new Powerup(
    "No futuro fará sentido",
    `+5 ${upgrade2.nome}`,
    1500,
    `upgrade2.quantidade +=5;
     poderClique+= upgrade2.bpc*5;
     document.getElementsByClassName("quantidadeUpgrade")[1].innerText = upgrade2.quantidade
    `,
  ),
  pw4: new Powerup(
    "Cultivo rápido",
    `${upgrade1.nome} 10% mais rápido`,
    2750,
    `upgrade1.speed = upgrade1.intervalo * 0.9`,
  ),
  pw5: new Powerup(
    "Pratos maiores",
    `+3 batatas/segundo na ${upgrade1.nome}`,
    8000,
    `upgrade1.bpi += 3; batatasPS += upgrade1.quantidade * 3`,
  ),



  pw7: new Powerup(
    "Cliques doces",
    `+1 batata/clique para cada ${upgrade2.nome} `,
    15000,
    `upgrade2.bpc += 1; poderClique += upgrade2.quantidade*upgrade2.bpc`,
  ),

  pw6: new Powerup(
    "Invista com calma",
    `USO ÚNICO - dobra o banco de batatas ATUAL`,
    50,
    `batatas *= 2; textoBancoBatatas();`,
  ),

  pw8: new Powerup(
    "Enxada afiada",
    `+4 batata/clique na ${upgrade5.nome}`,
    25000,
    `upgrade5.bpc += 4; poderClique += upgrade5.quantidade * 4`,
  ),
  pw9: new Powerup(
    "Limão, sal, azeite...",
    `+7 batatas/segundo na ${upgrade1.nome}`,
    42000,
    `upgrade1.bpi += 7; batatasPS += upgrade1.quantidade * 7`,
  ),
  pw10: new Powerup(
    "Crocância e sabor",
    `+15 batatas/segundo na ${upgrade2.nome}`,
    70000,
    `upgrade2.bpi += 15; batatasPS += upgrade2.quantidade * 15`,
  ),
  pw11: new Powerup(
    "Adubo",
    `15 batatas/clique na ${upgrade5.nome}`,
    100000,
    `upgrade5.bpc += 15; poderClique += upgrade5.quantidade * 15`,
  ),
  pw12: new Powerup(
    "Cliques nutritivos",
    `+3 batata/clique para cada 4 ${upgrade1.nome} `,
    120000,
    `upgrade1.bpc += 3; poderClique += upgrade1.quantidade*upgrade1.bpc`,
  ),
  pw13: new Powerup(
    "Cliques salgados",
    `+5 batata/clique para cada ${upgrade3.nome} `,
    160000,
    `upgrade3.bpc += 5; poderClique += upgrade3.quantidade*upgrade3.bpc`,
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
  preco.textContent = sufixarNum(powerup.preco, 2, true) + " batatas";
  descricao.textContent = powerup.descricao;

  document.getElementById("infoPowerups").style.display = "block";
}

function esconderPowerupDetalhado() {
  document.getElementById("infoPowerups").style.display = "none";
}
