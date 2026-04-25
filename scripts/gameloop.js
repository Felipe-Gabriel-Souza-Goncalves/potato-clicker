let ultimoTempo = 0;
const events = [
  {
    actions: [iterarEfeitos],
    timeNeeded: 500,
    accumulator: 0
  },
  {
    actions: [incrementarTempoJogo, incrementarTempoSecao],
    timeNeeded: 1000,
    accumulator: 0
  },
  {
    actions: [estatisticas],
    timeNeeded: 2500,
    accumulator: 0
  },
  {
    actions: [verificarConquistas, verificarConquistasInuteis],
    timeNeeded: 5000,
    accumulator: 0
  },
  {
    actions: [salvarTemporario],
    timeNeeded: 30000,
    accumulator: 0
  },
]

function runActionGlobal(index){
  const group = events[index]
  group.actions.forEach(func => func())
}

function onTime(index){
  const group = events[index]
  
  if(group.accumulator >= group.timeNeeded){
    group.accumulator = 0
    runActionGlobal(index)
  }
}

function loop(tempoAtual) {
  if (!ultimoTempo) ultimoTempo = tempoAtual;

  const delta = tempoAtual - ultimoTempo;
  ultimoTempo = tempoAtual;


  // Gerais
  // Adicionar o tempo ao acumulador
  // Foi feito separadamente para ter o menor intervalo possível entre acumuladores
  for(let i = 0; i < events.length; i++){ 
    events[i].accumulator += delta
  }

  // Iterar por acumulador se chegou ao necessário 
  for(let i = 0; i < events.length; i++){
    onTime(i)
  }

  // Eventos reservador para Upgrades
  // Adicionar o tempo ao acumulador
    for(let i = 0; i < upgradesInterval.length; i++){
    upgradesInterval[i].accumulator += delta
  }

  // Iterar por acumulador se chegou ao necessário 
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
  textoBancoBatatas()
  textoBatatasPorSegundo()
  // Script
  // batatasPorSeg()
}

carregarTudo()

document.getElementById("selectBatatasPorSegundo").addEventListener("change", () =>{
  document.getElementById("estatBatatasPorSegundo").innerHTML = valorSelectCPS()
});
