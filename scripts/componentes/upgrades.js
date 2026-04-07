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
              ${transformNum(upgd.preco, 2, true)} batatas
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
      <div id="infoUpgrade">
        <span id="infoNome"></span>
        <p>Unidade | Total</p>
        <p>bpi: <span id="infoBpi">lorem - lorem</span></p>
        <p>bpc: <span id="infoBpc">lorem - lorem</span></p>
      </div>
    `

    this.appendChild(fragment)
    this.appendChild(containerInfo)

    iterarEfeitos()
  }
}


customElements.define("jogo-upgrades", UpgradesComponente)