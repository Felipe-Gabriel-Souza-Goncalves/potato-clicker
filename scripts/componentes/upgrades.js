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
        <div class="itemUpgrade">
          <div title="${upgd.nome}">
            <img 
                class="imgUpgrade"
                src="imagens/${imagens[i] || "fechar.png"}" 
                alt="${upgd.nome}"
                onclick="Upgrades.upgradesExistentes[${i}].comprarUpgrade(${i})"
            >
            <span class="quantidadeUpgrade">${upgd.quantidade}</span>
          </div>
          <div>
            <p class="precoUpgrade">
              ${transformNum(upgd.quantidade, 2, true)} batatas
            </p>
          </div>
        </div>
      `

      fragment.appendChild(div)
    })

    this.appendChild(fragment)
  }
}

customElements.define("jogo-upgrades", UpgradesComponente)