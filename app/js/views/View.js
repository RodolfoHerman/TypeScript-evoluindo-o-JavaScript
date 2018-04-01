class View {
    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }
    update(negociacoes) {
        this._elemento.innerHTML = this.template(negociacoes);
    }
}
