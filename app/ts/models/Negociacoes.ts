class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];
    //Outro modo de delcarar Array sem o diamante
    //private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao> {
    //paraArray(): Negociacao[] {

        return [].concat(this._negociacoes);
    }

}