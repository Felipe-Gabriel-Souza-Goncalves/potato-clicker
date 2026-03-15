let ultimoTempo = 0;
let accumulator1s = 0;
let accumulator2_5s = 0;
let accumulator5s = 0;
let accumulator30s = 0;

const accumulators = [accumulator1s, accumulator2_5s, accumulator5s, accumulator30s]

const events = [
  {
    actions: [batatasPorSeg, incrementarTempoJogo, iterarEfeitos],
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



function runActionGlobal(index){
  const group = events[index]
  group.actions.forEach(func => func())
}



function onTime(index){
  const group = events[index]
  
  if(accumulators[index] >= group.timeNeeded){
    accumulators[index] = 0
    runActionGlobal(index)
  }
}

function loop(tempoAtual) {
  if (!ultimoTempo) ultimoTempo = tempoAtual;

  const delta = tempoAtual - ultimoTempo;
  ultimoTempo = tempoAtual;


  // Gerais
  for(let i = 0; i < accumulators.length; i++){
    accumulators[i] += delta
  }

  for(let i = 0; i < accumulators.length; i++){
    onTime(i)
  }

  // Upgrades
    for(let i = 0; i < upgradesInterval.length; i++){
    upgradesInterval[i].accumulator += delta
  }

  for(let i = 0; i < upgradesInterval.length; i++){
    const up = upgradesInterval[i]
    
    if(up.accumulator >= up.timeNeeded){
      up.accumulator = 0
      up.actions.forEach(_ => {
        if(Upgrades.upgradesExistentes[i].quantidade >=1){
          Upgrades.upgradesExistentes[i].acrescentarBatatasPassivas()
        }
      })
    }
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function carregarTudo() {
  /*
    Há instâncias de código js que ocorrem antes daqui por conta do connectedCallback 
    dos customElements 
  */
  carregarSave()

  // Salvar
  carregarSelectBatatas()

  // Conquistas
  carregarConquistas()

  textoAudio()
  alterarFundo()
  
  // Script
  batatasPorSeg()
}

carregarTudo()

document.getElementById("selectBatatasPorSegundo").addEventListener("change", () =>{
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS()
});
