const infoConquista = document.getElementById("infoConquista")
const imgTrofeu = document.getElementById("trofeuConquista")
const textNome = document.getElementById("nomeConquista")
const textDescricao = document.getElementById("descricaoConquista")

class Conquistas{

    static numeroConquistasTotais = 0
    static conquistasTotais = []
    static numeroConquistasLiberadas = 0

    set completa(bool){
        this._completa = bool

        Conquistas.numeroConquistasLiberadas += 1
        const liberado = Conquistas.numeroConquistasLiberadas 
        const total = Conquistas.numeroConquistasTotais

        document.getElementById("numeroConquistas").innerHTML = ` ${liberado}/${total} (${(liberado/total*100).toFixed(1)}%)`
    }

    get completa(){
        return this._completa
    }


    constructor(nome, descricao, criterio, categoria){

        this.nome = nome,
        this.descricao = descricao
        this.criterio = criterio,
        this.categoria = categoria
        this._completa = false
        this.index = Conquistas.numeroConquistasTotais

        Conquistas.numeroConquistasTotais++   
        Conquistas.conquistasTotais.push(this)
    }
}

const randomStats = { // Estatísticas inúteis para fazer conquistas
  elementOpened: null,
  timeStatistic: 0,
  timeConfig: 0,
  conquistasAbertas: 0,
  saveManual: 0, // Pega a referencia ;)
  tentativasComprar: 0,
  letras: []
}


const dadosConquistas = {
    c1: new Conquistas("Começando!", "Fez ao menos 100 batatas no total", "batataTotal >= 100", "bronze"),
    c2: new Conquistas("Um pouco mais", "Fez ao menos 1.000 batatas no total", "batataTotal >= 1000", "bronze"),
    c3: new Conquistas("Aberto para todos!", "Fez ao menos 10.000 batatas no total!", "batataTotal >= 10000", "bronze"),
    c4: new Conquistas("Melhor do mundo!", "Fez ao menos 100.000 batatas no total!!!", "batataTotal >= 100000", "prata"),
    c29: new Conquistas("Monopólio", "Fez ao menos 1.000.000 batatas no total!!!", "batataTotal >= 1000000", "prata"),
    c30: new Conquistas("Mundo de batata", "Fez ao menos 10.000.000 batatas no total!!!", "batataTotal >= 10000000", "prata"),
    c31: new Conquistas("Overdose de batata", "Fez ao menos 100.000.000 batatas no total!!!", "batataTotal >= 100000000", "ouro"),
    c32: new Conquistas("Batata.", "Fez ao menos 1.000.000.000 batatas no total!!!", "batataTotal >= 1000000000", "ouro"),

    c5: new Conquistas("Devagar se vai longe", `Atingiu 1 batatas por segundo`, "batatasPS >= 1", "bronze"), // AAA
    c6: new Conquistas("Ainda pouco, porém melhor", `Atingiu 50 batatas por segundo`, "batatasPS >= 50", "bronze"), // AAA
    c7: new Conquistas("Acelerando", `Atingiu 500 batatas por segundo`, "batatasPS >= 500", "prata"), // AAA
    c8: new Conquistas("Linha de produção", `Atingiu 2000 batatas por segundo`, "batatasPS >= 2000", "prata"), // AAA
    c8: new Conquistas("Pode aposentar o mouse", `Atingiu 10000 batatas por segundo`, "batatasPS >= 10000", "ouro"), // AAA

    c5: new Conquistas("Olha! faz sozinho!", `Comprou 1 ${upgrade1.nome}`, "upgrade1.quantidade >= 1", "bronze"),
    c6: new Conquistas("Tempero saboroso", `Comprou 10 ${upgrade1.nome}`, "upgrade1.quantidade >= 10", "bronze"),
    c7: new Conquistas("Uma alternativa saudável", `Comprou 25 ${upgrade1.nome}`, "upgrade1.quantidade >= 25", "prata"),
    c8: new Conquistas("Definitivamente algo", `Comprou 50 ${upgrade1.nome}`, "upgrade1.quantidade >= 50", "ouro"),

    c9: new Conquistas("5x melhor!", `Comprou 1 ${upgrade2.nome}`, "upgrade2.quantidade >= 1", "bronze"),
    c10: new Conquistas("Ótimo custo benefício", `Comprou 10 ${upgrade2.nome}`, "upgrade2.quantidade >= 10", "bronze"),
    c11: new Conquistas("Doce e produtivo", `Comprou 25 ${upgrade2.nome}`, "upgrade2.quantidade >= 25", "prata"),
    c12: new Conquistas("Wow. batatas.", `Comprou 50 ${upgrade2.nome}`, "upgrade2.quantidade >= 50", "ouro"),

    c13: new Conquistas("Que forno grande", `Comprou 1 ${upgrade3.nome}`, "upgrade3.quantidade >= 1", "bronze"),
    c14: new Conquistas("Cuidado com colesterol!", `Comprou 10 ${upgrade3.nome}`, "upgrade3.quantidade >= 10", "bronze"),
    c15: new Conquistas("Para que tanto?", `Comprou 25 ${upgrade3.nome}`, "upgrade3.quantidade >= 25", "prata"),
    c16: new Conquistas("Risco a saúde", `Comprou 50 ${upgrade3.nome}`, "upgrade3.quantidade >= 50", "ouro"),
    
    c13: new Conquistas("Bom acompanhamento", `Comprou 1 ${upgrade4.nome}`, "upgrade4.quantidade >= 1", "bronze"), // AAA
    c14: new Conquistas("Textura suave", `Comprou 10 ${upgrade4.nome}`, "upgrade4.quantidade >= 10", "bronze"), // AAA
    c15: new Conquistas("Muito carboidrato", `Comprou 25 ${upgrade4.nome}`, "upgrade4.quantidade >= 25", "prata"), // AAA
    c16: new Conquistas("Hábito alimentar", `Comprou 50 ${upgrade4.nome}`, "upgrade4.quantidade >= 50", "ouro"), // AAA

    c13: new Conquistas("Trabalho honesto", `Comprou 1 ${upgrade5.nome}`, "upgrade5.quantidade >= 1", "bronze"), // AAA
    c14: new Conquistas("Carpinando do lote", `Comprou 10 ${upgrade5.nome}`, "upgrade5.quantidade >= 10", "bronze"), // AAA
    c15: new Conquistas("Mão de obra", `Comprou 25 ${upgrade5.nome}`, "upgrade5.quantidade >= 25", "prata"), // AAA
    c16: new Conquistas("Enxada de ferro", `Comprou 50 ${upgrade5.nome}`, "upgrade5.quantidade >= 50", "prata"), // AAA
    c16: new Conquistas("Enxada de aço", `Comprou 100 ${upgrade5.nome}`, "upgrade5.quantidade >= 100", "ouro"), // AAA
    c16: new Conquistas("Enxada de diamante", `Comprou 200 ${upgrade5.nome}`, "upgrade5.quantidade >= 200", "ouro"), // AAA

    c17: new Conquistas("O início!", `Clicou 1 vez`, "cliques >= 1", "bronze"),
    c18: new Conquistas("Pegando o ritmo", `Clicou 500 vezes`, "cliques >= 500", "bronze"),
    c19: new Conquistas("O começo de muitos", `Clicou 1.000 vezes`, "cliques >= 1000", "prata"),
    c20: new Conquistas("Doendo o dedo", `Clicou 5.000 vezes`, "cliques >= 5000", "prata"),
    c21: new Conquistas("Espírito de clicker", `Clicou 10.000 vezes`, "cliques >= 10000", "ouro"),
    c22: new Conquistas("Por que???", `Clicou 100.000 vezes`, "cliques >= 100000", "ouro"),

    c24: new Conquistas("Um pouco de upgrades", `Comprou 5 upgrades`, "Upgrades.numeroDeUpgrades >= 5", "bronze"),
    c25: new Conquistas("Vários upgrades", `Comprou 10 upgrades`, "Upgrades.numeroDeUpgrades >= 25", "bronze"),
    c26: new Conquistas("Muitos upgrades", `Comprou 50 upgrades`, "Upgrades.numeroDeUpgrades >= 100", "prata"),
    c27: new Conquistas("Upgrades demais", `Comprou 100 upgrades`, "Upgrades.numeroDeUpgrades >= 250", "ouro"),
    c28: new Conquistas("Upgrade que não acaba!", `Comprou 250 upgrades`, "Upgrades.numeroDeUpgrades >= 500", "ouro"),

    c24: new Conquistas("Poderoso", `Comprou 1 powerups`, "Powerup.numComprados >= 1", "bronze"), // AAA
    c25: new Conquistas("Avanço rápido", `Comprou 3 powerups`, "Powerup.numComprados >= 3", "prata"), // AAA
    c26: new Conquistas("Com grandes poderes...", `Comprou 5 powerups`, "Powerup.numComprados >= 5", "prata"), // AAA
    c27: new Conquistas("São muitos powerups", `Comprou 10 powerups`, "Powerup.numComprados >= 10", "ouro"), // AAA
    c28: new Conquistas("Viu que tinha um de 50 batatas?", `Comprou todos os powerups`, "Powerup.numComprados == Powerup.ordemPowerups.length", "ouro"), // AAA

    volume_mute: new Conquistas("Ei! Tá no mudo!", `Deixe no volume máximo e desative o volume`, "!SFXligado && document.getElementById('volumeSFX').value == '1'", "bronze"),
    time_config: new Conquistas("Do meu jeito", `Ficou 5min seguidos vendo as configurações`, "randomStats.timeConfig >= 300", "bronze"),
    time_statistic: new Conquistas("Analista de dados", `Ficou 5min seguidos vendo as estatísticas`, "randomStats.timeStatistic >= 300", "bronze"),
    open_achieviments: new Conquistas("VOU LIBERAR TODOS!", `Abriu as conquistas mais de 25 vezes`, "randomStats.conquistasAbertas >= 25", "bronze"),
    manual_saves: new Conquistas("Não confio na automação", `Salvou manualmente 10 vezes`, "randomStats.saveManual >= 10", "bronze"),
    buy_tries: new Conquistas("Me deixe comprar!!!", `Tentou comprar algo sem batatas suficientes 100 vezes`, "randomStats.tentativasComprar >= 100", "prata"),

}



function carregarConquistas(){
    const campoConquistas = document.querySelector("#campoConquistas")


    // Cria todos os elementos de conquista
    Conquistas.conquistasTotais.forEach((conq, i) =>{
        const container = document.createElement("div")
        container.classList.add("containerConquistas")
        conq._completa ? "" : container.classList.add("conquistaBloqueada")
        container.innerHTML = `
            <img loading="lazy" style="width: 60px" src="imagens/trofeu ${conq.categoria}.png">
            <div>
                <h5>${conq.nome}</h5>
            </div>
        `

        // Adiciona os eventos de mostrar/esconder informações da conquista
        container.addEventListener("mouseenter", () => {mostrarConquistaDetalhada(i)})
        container.addEventListener("mouseleave", (e) => {
            if(e.relatedTarget == infoConquista ||
               e.currentTarget == infoConquista ||
               e.target == infoConquista
            ) return
            ocultarConquistaDetalhada()
        })

        campoConquistas.appendChild(container)
    })
}

function verificarConquistas(){
    Conquistas.conquistasTotais.forEach((conq, i) =>{
        try {
            if(conq.completa == false && eval(conq.criterio) == true){
                liberarConquista(conq, i)
            }
        } catch (error) {
            console.log("Erro na conquista", conq, ", ERRO:", error)
        }
    })
}

function liberarConquista(conquista, elementIndex){    

    if(conquista.completa === true) return

    document.querySelectorAll(".containerConquistas")[elementIndex].classList.remove("conquistaBloqueada")
    conquista.completa = true // Aciona Setter

    const popup = `
        <div class="popupConquista">
        <span class="fecharPopup" onclick="this.parentElement.remove()">x</span>
            <p>Conquista desbloqueada!</p>
            <div>
                <img src="imagens/trofeu ${conquista.categoria}.png" alt="troféu">
                <div>
                    <h2>${conquista.nome}</h2>
                    <p>${conquista.descricao}</p>
                </div>
            </div>
        </div>
    `

    document.getElementById("campoPopupsConquistas").innerHTML += popup

    setTimeout(() => {excluirPopupConquista()}, 5000)
}

function verificarConquistasInuteis(){
    try {
        eval(dadosConquistas.time_config.criterio) ? liberarConquista(dadosConquistas.time_config) : ""
        eval(dadosConquistas.time_config.time_statistic) ? liberarConquista(dadosConquistas.time_statistic) : ""
        eval(dadosConquistas.time_config.open_achieviments) ? liberarConquista(dadosConquistas.open_achieviments) : ""
        eval(dadosConquistas.time_config.manual_saves) ? liberarConquista(dadosConquistas.manual_saves) : ""
        eval(dadosConquistas.time_config.buy_tries) ? liberarConquista(dadosConquistas.buy_tries) : ""
    } catch (error) {
        console.log("Erro na conquista aleatória", ", ERRO:", error)
    }
}

function mostrarConquistaDetalhada(index){
    const conq = Conquistas.conquistasTotais[index]

    if(conq.completa === false || conq.completa === undefined){
        infoConquista.style.display = "none"
        return
    }
    
    infoConquista.style.display = "flex"

    imgTrofeu.src = "imagens/trofeu " + conq.categoria +".png"
    textNome.innerText = conq.nome
    textDescricao.innerText = conq.descricao
}

function ocultarConquistaDetalhada(){
    infoConquista.style.display = "none"
}

function excluirPopupConquista(){
    const primeiroPopup = document.getElementsByClassName("popupConquista")[0]
    if(primeiroPopup){primeiroPopup.remove()}
}


function incrementarTempoSecao(){
    switch (randomStats.elementOpened) {
        case "config":
            randomStats.timeConfig++; 
            randomStats.timeStatistic = 0;
            break;
        case "estatistica":
            randomStats.timeStatistic++;
            randomStats.timeConfig = 0;
            break;
        default:
            randomStats.timeStatistic = 0;
            randomStats.timeConfig = 0;
            break;
    }
}