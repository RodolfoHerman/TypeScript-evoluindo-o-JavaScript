//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
//import e export importamos e exportamos artefatos respectivamente.

// import { MensagemView } from '../views/MensagemView';
// import { NegociacoesView } from '../views/NegociacoesView';
// import { Negociacao } from '../models/Negociacao';
// import { Negociacoes } from '../models/Negociacoes';

//Utilizar a técnica BARREl (Barril) para deixar o código mais enxuto para exportar.
//Um barril, ou barrel no inglês é uma maneira de centralizarmos em um único 
//módulo a importação de outros módulos.
import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');

    constructor() {

        //let $ = document.querySelector.bind(document);

        //Realizando o casting (utilizamos <> para isso) de um elemento 
        //genérico para um elemento mais específico
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }


    adiciona(event: Event) {

        event.preventDefault();

        let negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociaçao adicionada com sucesso!');
    }


}