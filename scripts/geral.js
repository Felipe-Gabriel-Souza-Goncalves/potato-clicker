function abrirSecao(idSecao, idsSecoesAuxiliares = null, callback = null){
  document.getElementById("divConfiguracoes").style.display = "none"
  document.getElementById("divEstatisticas").style.display = "none"
  document.getElementById("divConquistas").style.display = "none"

  idSecao != null ? document.getElementById(idSecao).style.display = "unset" : ""
  
  if(idsSecoesAuxiliares){
    Array.from(idsSecoesAuxiliares).forEach(id =>{
      document.getElementById(id).style.display = "inherit"
    })
  }

  if(callback){
    callback()
  }
}

function configAberta(){randomStats.elementOpened = "config"}
function estatisticaAberta(){randomStats.elementOpened = "estatistica"}
function abriuConquista(){randomStats.conquistasAbertas++}

window.addEventListener("DOMContentLoaded", ()=>{
  alterarFoto()
})

function alterarFoto(){
  const tudoEsquerda = document.getElementById("tudoPraEsquerda")
  const agora = new Date()
  if(agora.getHours() > 5 && agora.getHours() < 18){
    tudoEsquerda.style.backgroundImage = "url(../imagens/bg-manha2.png)"
    tudoEsquerda.style.color= "black"
  } else{
    tudoEsquerda.style.backgroundImage = "url(../imagens/bg-noite1.png)"
    tudoEsquerda.style.color= "white"
  }
}