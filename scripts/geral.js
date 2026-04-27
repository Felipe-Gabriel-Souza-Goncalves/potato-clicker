
function abrirSecao(idSecao, idsSecoesAuxiliares = null, arrayCallback = []){
  document.getElementById("divConfiguracoes").style.display = "none"
  document.getElementById("divEstatisticas").style.display = "none"
  document.getElementById("divConquistas").style.display = "none"
  document.getElementById("divSkins").style.display = "none"

  if(idSecao != null){
    document.getElementById(idSecao).style.display = "unset"
  } else{
    randomStats.elementOpened = null
  }
  
  if(idsSecoesAuxiliares){
    Array.from(idsSecoesAuxiliares).forEach(id =>{
      document.getElementById(id).style.display = "inherit"
    })
  }

  if(arrayCallback.length !== 0){
    arrayCallback.forEach(callback => callback())
  }
}

function hoverAba(escolha){
  const imgs = document.querySelectorAll(".navSecoes img")
  const abaNome = document.getElementById("abaNome")

  if(!escolha && escolha !== 0){
    abaNome.style.display = "none"
    return
  }
  
  abaNome.style.display = "block"

  switch (escolha) {
    case 0:
      abaNome.textContent = "Configurações"
      abaNome.style.positionAnchor = "--aba1"
      break;
    case 1:
      abaNome.textContent = "Estatísticas"
      abaNome.style.positionAnchor = "--aba2"
      break;  
    case 2:
      abaNome.textContent = "Conquistas"
      abaNome.style.positionAnchor = "--aba3"
      break;
    default:
      abaNome.style.display = "none"
      abaNome.style.anchorName = ""

      break;
  }
}


function configAberta(){
  randomStats.elementOpened = "config"}
function estatisticaAberta(){
  randomStats.elementOpened = "estatistica"}
function abriuConquista(){
  randomStats.conquistasAbertas++;
  randomStats.elementOpened = "conquista"
}
function limparElementOpened(){
  randomStats.elementOpened =  ""
}

function alterarFundo(){
  const tudoEsquerda = document.getElementById("tudoPraEsquerda")
  const agora = new Date()
  if(agora.getHours() > 5 && agora.getHours() < 18){ 
    tudoEsquerda.style.backgroundImage = "url(imagens/bg-manha2.png)"
    tudoEsquerda.style.color= "black"
  } else{
    tudoEsquerda.style.backgroundImage = "url(imagens/bg-noite1.png)"
    tudoEsquerda.style.color= "white"
  }
}

// Arrays de sufixos disponíveis
const sufixosCurtos = ["k", "mi", "bi", "tri", "qua", "qui", "sex", "sep", "oct", "non", "dec"];
const sufixosLongos = [" mil", " milhões", " bilhões", " trilhões", " quadrilhões", " quintilhões",
                       " sextilhões", " septilhões", " octilhões", " nonilhões", " decilhões"];

function sufixarNum(num, precisao = 1, curto = false) {

  // Filtra a string e pega seu tamanho
  let stringNum = String(num);
  stringNum = filterStringNum(stringNum);
  const size = stringNum.length;

  // Retorna se número for menor que 1000
  if (size <= 3) return num

  // Qual index para pegar no array de sufixos
  const index = Math.ceil((size - 3) / 3) - 1;

  // Calcula quantos números antes do ponto
  let endFor = size % 3;
  if (endFor === 0) endFor = 3
  
  let finalString = "";

  // Se o número for negativo
  if (typeof num === "string" && num[0] === "-") {
    finalString += "-";
  }

  // Adiciona os números antes do ponto
  for (let i = 0; i < endFor; i++) {
    finalString += stringNum[i];
  }

  // Adiciona precisão decimal
  if (precisao > 0) {
    finalString += ".";

    for (let j = endFor; j < endFor + precisao; j++) {
      if (j > size - 1) {
        finalString += "0";
        continue;
      }
      finalString += stringNum[j];
    }
  }


  // Retira 0 desnecessários
  finalString = Number(finalString).toString()
  
  // Adiciona notação científica caso ultrapasse os sufixos
  if (index >= sufixosLongos.length) {
    finalString += "e" + (size - endFor);
  } else {
    // Adiciona sufixo (longo ou curto)
    finalString += curto ? sufixosCurtos[index] : sufixosLongos[index];
  }

  return finalString;
}

function filterStringNum(stringNum) {
  return String(stringNum)
    .replace(/\./g, "")
    .replace(/ /g, "")
    .replace(/\+/g, "")
    .replace(/-/g, "");
}

document.addEventListener("visibilitychange", () =>{
  if(document.hidden){
    document.title = 'Batata clicker (pausado)'
  } else{
    document.title = 'Batata clicker'
  }
})

let seg = 0
function contarTempoJogo(seg){
  let string = ""
  function formatarSegundos(seg){
    const dataZero = new Date(0,0,0,0,0,seg,0)
    const horas = dataZero.getHours().toString().padStart(2, 0)
    const minutos = dataZero.getMinutes().toString().padStart(2, 0)
    const segundos = dataZero.getSeconds().toString().padStart(2, 0)

    string = `${horas}:${minutos}:${segundos}`
  }
  
  formatarSegundos(seg)
  return string
}
const incrementarTempoJogo = function (){seg++}