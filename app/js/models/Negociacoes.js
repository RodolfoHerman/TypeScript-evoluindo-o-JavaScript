class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    //Outro modo de delcarar Array sem o diamante
    //private _negociacoes: Negociacao[] = [];
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        //paraArray(): Negociacao[] {
        return [].concat(this._negociacoes);
    }
}
