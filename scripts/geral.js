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
    tudoEsquerda.style.backgroundImage = "url(imagens/bg-manha2.png)"
    tudoEsquerda.style.color= "black"
  } else{
    tudoEsquerda.style.backgroundImage = "url(imagens/bg-noite1.png)"
    tudoEsquerda.style.color= "white"
  }
}

// Arrays de sufixos disponíveis
const sufixosLongos = [
  " mil", " milhões", " bilhões", " trilhões", " quadrilhões",
  " quintilhões", " sextilhões", " septilhões",
  " octilhões", " nonilhões", " decilhões"
];

const sufixosCurtos = [
  "k", "mi", "bi", "tri", "qua",
  "qui", "sex", "sep", "oct", "non", "dec"
];

function transformNum(num, precisao = 1, curto = false) {

  // Filtra a string e pega seu tamanho
  let stringNum = String(num);
  stringNum = filterStringNum(stringNum);
  const size = stringNum.length;

  // Retorna se número for menor que 1000
  if (size <= 3) {
    return num;
  }

  // Qual index para pegar no array de sufixos
  const index = Math.ceil((size - 3) / 3) - 1;

  // Calcula quantos números antes do ponto
  let endFor = size % 3;
  if (endFor === 0) {
    endFor = 3;
  }

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