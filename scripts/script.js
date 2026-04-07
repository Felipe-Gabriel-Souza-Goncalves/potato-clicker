const displayBatatas = document.getElementById("batatas")
const displayBatatasPS = document.getElementById("batatasPS")
const volumeSFX = document.getElementById("volumeSFX");
const textoAudioLigado = document.getElementById("toggleSFX")
const textoVolume = document.getElementById("configVolume")

var batatas = 0;
var batatasPS = 0;
var batataTotal = 0;
let cliques = 0;
let poderClique = 1;
let SFXligado = true;


function audioBatata() {
  if (SFXligado == true) {

    let sonsBatata = ["sfx/pop-1.mp3", "sfx/pop-2.mp3", "sfx/pop-3.mp3"];
    let index = Math.floor(Math.random() * 3);
    var audio = new Audio(sonsBatata[index]);

    audio.volume = volumeSFX.value;
    audio.play()
  } 

  textoAudio()
}

function textoAudio(){
  SFXligado ? 
    textoAudioLigado.innerText = "Desligar efeitos sonoros" :
    textoAudioLigado.innerText = "Ligar efeitos sonoros"
    
  SFXligado ?
    textoVolume.innerText = (volumeSFX.value*100).toFixed(0) + "%" :
    textoVolume.innerText = (volumeSFX.value*100).toFixed(0) + "% (mutado)" 
}

function clicarNaBatata() {
  audioBatata();
  batatas += Math.floor(poderClique);
  batataTotal += Math.floor(poderClique);
  cliques += 1;
  textoBancoBatatas()
}

// Função de adicionar batatas por segundo ao banco de batatas
function batatasPorSeg() {
  batatas += batatasPS;
  batataTotal += batatasPS;

  textoBancoBatatas()
  textoBatatasPorSegundo()


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

function carregarSelectBatatas() {
  const select = document.getElementById("selectBatatasPorSegundo");
  select.innerHTML = "";

  Upgrades.upgradesExistentes
    .filter((upgd) => upgd.bpi > 0)
    .forEach((upgd, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = upgd.nome;

      select.appendChild(option);
    });

  select.innerHTML += `<option value="total">Total</option>`;
}



