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
