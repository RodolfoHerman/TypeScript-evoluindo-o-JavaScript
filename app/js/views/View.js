class View {
    constructor(seletor) {
        this._elemento = $(seletor);
    }
    update(negociacoes) {
        this._elemento.html(this.template(negociacoes));
    }
}
