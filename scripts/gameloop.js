let ultimoTempo = 0;
let acumulador1s = 0;
let acumulador5s = 0;

const events = [
  {
    actions: [],
    timeNeeded: 1000
  },
  {
    actions: estatisticas,
    timeNeeded: ''
  },
  {
    actions: '',
    timeNeeded: ''
  },
]

function loop(tempoAtual) {
  if (!ultimoTempo) ultimoTempo = tempoAtual;

  const delta = tempoAtual - ultimoTempo;
  ultimoTempo = tempoAtual;

  acumulador1s += delta;
  acumulador5s += delta;

  if (acumulador1s >= 1000) {
    acumulador1s -= 1000;
    console.log("1seg")
  }

  if (acumulador5s >= 5000) {
    acumulador5s -= 5000;
    console.log("5seg")
  }

  requestAnimationFrame(loop);
}

// requestAnimationFrame(loop);


carregarTabela();

// Salvar
// pegarLocalStorage();
carregarSelectBatatas()


// Decorações
setInterval(estatisticas, 2500)

// Conquistas
verificarConquistas()
verificarConquistasInuteis()
carregarConquistas()

setInterval(() =>{
  verificarConquistas();
  verificarConquistasInuteis();
}, 5000)

// Script
batatasPorSeg()
carregarTextosPrecos()
textoAudio()

setInterval(salvarTemporario, 30000);
setInterval(batatasPorSeg, 1000);


document.getElementById("selectBatatasPorSegundo").addEventListener("change", () =>{
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS()
});
