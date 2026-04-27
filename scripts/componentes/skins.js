class Skins {
  static skinsExistentes = [];
  static selecionado = 0;

  constructor(nome, src, meta) {
    this.index = Skins.skinsExistentes.length;
    this.desbloqueado = this.index == 0 ? true : false;
    this.nome = nome;
    this.src = src;
    this.meta = meta; // Número de conquistas liberadass

    Skins.skinsExistentes.push(this)
  }

  static verificar(index) {
    const skin = Skins.skinsExistentes[index];
    if (!skin) return;
    if(skin.desbloqueado){
      skin.selecionar()
      return
    }

    if (Conquistas.numeroConquistasLiberadas >= skin.meta) {
      skin.liberar();
    }
  }

  liberar() {
    try {
      this.desbloqueado = true;
      this.selecionar()
    } catch (error) {
      console.log("Houve um erro ao liberar a skin");
    }
  }

  selecionar() {
    Skins.selecionado = this.index;
    document.getElementById("imagemBatata").src = "imagens/" + this.src;
  }
}

class SkinsComponente extends HTMLElement {
  async connectedCallback() {
    const res = await fetch("data/skins.json");
    const data = await res.json();

    data.map(skin => new Skins(skin.nome, skin.src, skin.meta))
    // console.log(data)
    // console.log(Skins.skinsExistentes)
    // Skins.skinsExistentes = data;

    this.innerHTML = `
      <div id="divSkins">
        <img src="imagens/fechar.png"  class="botaoFecharDiv" >
        <div>
          ${Skins.skinsExistentes
            .map(
              (skin, i) => `
                  <div class="itemSkin" onclick="Skins.verificar(${i})">
                    <img src="imagens/${skin.src}" alt="${skin.nome}">
                    <span>${skin.nome}</span> <br>
                    <span>${skin.meta} conquistas necessárias</span>
                  </div>
                `,
            )
            .join("")}
        </div>
      </div>`;


    const navFecharSkin = document.querySelector("#divSkins img");

    if(navFecharSkin){
      console.log(navFecharSkin)
      navFecharSkin.addEventListener("click", () => {abrirSecao();});
    }
  }
}

customElements.define("jogo-skins", SkinsComponente);
