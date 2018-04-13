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
import { logarTempoDeExecucao, domInject } from '../helpers/decorators/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @domInject('#valor')
    private _inputValor: JQuery;
    
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');

    constructor() {

        //let $ = document.querySelector.bind(document);

        //Realizando o casting (utilizamos <> para isso) de um elemento 
        //genérico para um elemento mais específico

        //Utilizando o decorator domInject()
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }

    @logarTempoDeExecucao(true)
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));


        if(!this.ehDiaDaSemana(data)) {

            this._mensagemView.update('Negociações só podem ser realizadas em dias uteis');

            return;
        }


        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociaçao adicionada com sucesso!');
    }

    private ehDiaDaSemana(data: Date) {

        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado

}