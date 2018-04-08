//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
//import e export importamos e exportamos artefatos respectivamente.
System.register(["../views/index", "../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
            //import e export importamos e exportamos artefatos respectivamente.
            NegociacaoController = class NegociacaoController {
                constructor() {
                    //let $ = document.querySelector.bind(document);
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    //Realizando o casting (utilizamos <> para isso) de um elemento 
                    //genérico para um elemento mais específico
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let negociacao = new index_2.Negociacao(new Date(this._inputData.val().replace(/-/g, ',')), parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociaçao adicionada com sucesso!');
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
