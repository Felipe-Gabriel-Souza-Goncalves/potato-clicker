var cookies = 0;
var cookiesPS = 0;
var cookieTotal = 0;
let cliques = 0;
let poderClique = 1;
let SFXligado = true;


// classe para upgrades
class Upgrades {
  static numeroDeUpgrades = 0;
  static upgradesExistentes = [];

  // Contar todos os upgrades criados quando o programa for rodado
  static contarUpgrades() {
    this.numeroDeUpgrades++;
  }

  // construtor de upgrades
  constructor(nome, preco, taxaPreco, cps, cpc) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = 0;
    this.taxaPreco = taxaPreco;
    this.cps = cps;
    this.cpc = cpc;

    Upgrades.upgradesExistentes.push(this);
  }

  // função para comprar upgrade passando id de 2 elementos HTML referente a quantidade/preco do upgrade

  comprarUpgrade(idQntd, idPreco, index) {
    for (let i = 0; i < qntdUpgradeComprar; i++) {
      if (cookies >= this.preco) {
        cookies -= this.preco;
        this.preco = Math.floor(this.preco * this.taxaPreco);
        this.quantidade++;

        poderClique += this.cpc
        cookiesPS += this.cps

        Upgrades.contarUpgrades();
        alterarTextosPrecos(this.preco, this.taxaPreco, index)
      } else {
        randomStats.tentativasComprar++
        break;
      }

      document.getElementById("contador").innerHTML = cookies + " Cookies";

      // mudar o html dos elementos passados no parametro
      document.getElementById(idQntd).innerHTML = this.quantidade;
    }
  }
}

// nome, preco, taxa (>1), cps (cookie por segundo), cpc (cookie por clique)
const upgrade1 = new Upgrades("+1 Cookie/seg", 5, 1.2, 1, 0);
const upgrade2 = new Upgrades("+5 Cookie/seg", 25, 1.42, 5, 0);
const upgrade3 = new Upgrades("+10 Cookie/seg", 200, 1.5, 10, 0);
const upgrade4 = new Upgrades("+1 Cookie/click", 1200, 1.3, 0, 1);

function audioCookie() {
  if (SFXligado == true) {

    let sonsCookie = ["sfx/pop-1.mp3", "sfx/pop-2.mp3", "sfx/pop-3.mp3"];
    let index = Math.floor(Math.random() * 3);
    var audio = new Audio(sonsCookie[index]);

    audio.volume = document.getElementById("volumeSFX").value;
    audio.play();
  } 

  textoAudio()
}

function textoAudio(){
  const volumeSFX = document.getElementById("volumeSFX").value;
  const textoAudioLigado = document.getElementById("toggleSFX")
  const textoVolume = document.getElementById("configVolume")

  SFXligado ? 
    textoAudioLigado.innerText = "Desligar efeitos sonoros" :
    textoAudioLigado.innerText = "Ligar efeitos sonoros"
    
  SFXligado ?
    textoVolume.innerText = (volumeSFX*100).toFixed(0) + "%" :
    textoVolume.innerText = (volumeSFX*100).toFixed(0) + "% (mutado)" 
}

function clicarNoCookie() {
  audioCookie();
  cookies += Math.floor(poderClique);
  cookieTotal += Math.floor(poderClique);
  cliques += 1;
  document.getElementById("contador").innerHTML = cookies + " Cookies";
}

// Função de adicionar cookies por segundo ao banco de cookies
function cookiesPorSeg() {
  cookies += cookiesPS;
  cookieTotal += cookiesPS;

  document.getElementById("contador").innerHTML = cookies + " Cookies";
  document.getElementById("cookies/s").innerHTML = cookiesPS + " Cookies por segundo";

  if(randomStats.elementOpened == "config"){randomStats.timeConfig++; randomStats.timeStatistic = 0}
  if(randomStats.elementOpened == "estatistica"){randomStats.timeStatistic++; randomStats.timeConfig = 0}

  Upgrades.upgradesExistentes.forEach((upgd,i) =>{
    alterarTextosPrecos(upgd.preco, upgd.taxaPreco, (i+1))
  })

}

function apagarProgresso() {
  Swal.fire({
    title: "Você tem certeza de que quer apagar o progresso?",
    showDenyButton: true,
    confirmButtonText: "Apagar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("CCconfig");
      window.location.href = "index.html";
    } else if (result.isDenied) {
      return;
    }
  });
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
                    onclick="upgrade${index}.comprarUpgrade('qntUp${index}', 'precoUp${index}', ${index})">
                    
                    ${upgrade.nome}
                </button>
            </td>
            <td class="qntUp" id="qntUp${index}">${upgrade.quantidade}</td>
            <td class="precoCompra" class="upgradeBloqueado"><h2 id="precoUp${index}">${upgrade.preco} cookies</h2></td>
        `;

    tabelaProdutos.appendChild(tr);
  });
}

function carregarSelectCookies() {
  const select = document.getElementById("selectCookiesPorSegundo");
  select.innerHTML = "";

  Upgrades.upgradesExistentes
    .filter((upgd) => upgd.cps > 0)
    .forEach((upgd, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = upgd.nome;

      select.appendChild(option);
    });

  select.innerHTML += `<option value="total">Total</option>`;
}



