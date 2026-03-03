let ultimoTempo = 0;
let accumulator1s = 0;
let accumulator2_5s = 0;
let accumulator5s = 0;
let accumulator30s = 0;

const accumulators = [accumulator1s, accumulator2_5s, accumulator5s, accumulator30s]

const events = [
  {
    actions: [batatasPorSeg],
    timeNeeded: 1000
  },
  {
    actions: [estatisticas],
    timeNeeded: 2500
  },
  {
    actions: [verificarConquistas, verificarConquistasInuteis],
    timeNeeded: 5000
  },
  {
    actions: [salvarTemporario],
    timeNeeded: 30000
  },
]

function runAction(index){
  const group = events[index]
  group.actions.forEach(func => func())
}

function onTime(index){
  const group = events[index]
  
  if(accumulators[index] >= group.timeNeeded){
    accumulators[index] = 0
    runAction(index)
  }
}

function loop(tempoAtual) {
  if (!ultimoTempo) ultimoTempo = tempoAtual;

  const delta = tempoAtual - ultimoTempo;
  ultimoTempo = tempoAtual;

  for(let i = 0; i < accumulators.length; i++){
    accumulators[i] += delta
  }

  for(let i = 0; i < accumulators.length; i++){
    onTime(i)
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


carregarTabela();

// Salvar
carregarSelectBatatas()

// Conquistas
verificarConquistas()
verificarConquistasInuteis()
carregarConquistas()

// Script
batatasPorSeg()
carregarTextosPrecos()
textoAudio()

document.getElementById("selectBatatasPorSegundo").addEventListener("change", () =>{
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS()
});
