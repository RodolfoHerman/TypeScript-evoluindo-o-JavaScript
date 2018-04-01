class NegociacaoController {

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');

    constructor() {

        let $ = document.querySelector.bind(document);

        //Realizando o casting (utilizamos <> para isso) de um elemento 
        //genérico para um elemento mais específico
        this._inputData = <HTMLInputElement> $('#data');
        this._inputQuantidade = <HTMLInputElement> $('#quantidade');
        this._inputValor = <HTMLInputElement> $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }


    adiciona(event: Event) {

        event.preventDefault();

        let negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
    }


}