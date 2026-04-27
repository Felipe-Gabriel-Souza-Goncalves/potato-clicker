class UpgradesComponente extends HTMLElement{
  connectedCallback(){
    this.carregarUI()
  }
  async carregarUI(){
    while (typeof Upgrades !== "function") {
      await new Promise((resolve, reject) => {
        setTimeout(() => {resolve()},50)
      })
    }

    this.innerHTML = ""
    const fragment = document.createDocumentFragment()
    const imagens = ["batata_salada.png", "batata_doce.png", "batata_chip.png", "batata_pure.png", "enxada.png"]

    Upgrades.upgradesExistentes.forEach((upgd, i) =>{
      const div = document.createElement("div")
      div.innerHTML = `
        <div 
          class="itemUpgrade upgradeBloqueado" 
          onclick="Upgrades.upgradesExistentes[${i}].comprarUpgrade(${i})"
        >
          <div title="${upgd.nome}">
            <img 
                class="imgUpgrade"
                src="imagens/${imagens[i] || "fechar.png"}" 
                alt="${upgd.nome}"
            >
            <span class="quantidadeUpgrade">${upgd.quantidade}</span>
          </div>
          <div>
            <p class="precoUpgrade">
              ${sufixarNum(upgd.preco, 2, true)} batatas
            </p>
          </div>
        </div>
      `

      div.addEventListener("mouseenter", () =>{
        Upgrades.mostrarInfoUpgrade(upgd.index)
      })

      div.addEventListener("mouseleave", (e) =>{
        if(e.relatedTarget == document.querySelector("jogo-upgrades > div:has(#infoUpgrade)")) return
        Upgrades.esconderInfoUpgrade()
      })

      fragment.appendChild(div)
    })

    const containerInfo = document.createElement("div")
    containerInfo.innerHTML = `
      <div id="infoUpgrade" class="infoFlutuante">
        <strong><span id="infoNome"></span></strong>
        <p>Unidade | Total</p>
        <p>Batatas passivas: <span id="infoBpi">lorem - lorem</span></p>
        <p>Batatas por clique: <span id="infoBpc">lorem - lorem</span></p>
        <p>Velocidade: <span id="infoVelocidade">lorem - lorem</span>
      </div>
    `

    this.appendChild(fragment)
    this.appendChild(containerInfo)

    iterarEfeitos()
  }
}


customElements.define("jogo-upgrades", UpgradesComponente)