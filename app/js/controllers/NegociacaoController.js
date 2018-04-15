//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
//import e export importamos e exportamos artefatos respectivamente.
System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../services/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, NegociacaoController, DiaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
            //import e export importamos e exportamos artefatos respectivamente.
            NegociacaoController = class NegociacaoController {
                constructor() {
                    //let $ = document.querySelector.bind(document);
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView', true);
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._service = new index_4.NegociacaoService();
                    //Realizando o casting (utilizamos <> para isso) de um elemento 
                    //genérico para um elemento mais específico
                    //Utilizando o decorator domInject()
                    // this._inputData = $('#data');
                    // this._inputQuantidade = $('#quantidade');
                    // this._inputValor = $('#valor');
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    //Como o decorator throttle posterga a execução do método
                    //o event.preventDefault() será executado depois, fazendo com que o
                    //formulário no browser seja limpado. Sendo assim, o event.preventDefault()
                    //é tratado no decaorator throller
                    //adiciona(event: Event) {
                    //event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this.ehDiaDaSemana(data)) {
                        this._mensagemView.update('Negociações só podem ser realizadas em dias uteis');
                        return;
                    }
                    let negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociaçao adicionada com sucesso!');
                }
                ehDiaDaSemana(data) {
                    return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
                }
                //O método abaixo foi substituido por este pois colocamos a lógica de obter negociações
                //em um service (criamos uma classe para essa responsabilidade)
                importarDados() {
                    // function isOk(response: Response) {
                    //     if(response.ok) {
                    //         return response;
                    //     } else {
                    //         throw new Error(response.statusText);
                    //     }
                    // }
                    //Utilizando a interface de função para garantir a assinatura correta do método
                    const isOk = (response) => {
                        if (response.ok) {
                            return response;
                        }
                        else {
                            throw new Error(response.statusText);
                        }
                    };
                    //Podemos criar a função diretamente no parâmetro em vez de importar seu tipo como está 
                    //na definição de 'isOk' acima 
                    //this._service.obterNegociacoes(isOk)
                    this._service.obterNegociacoes((response) => {
                        if (response.ok) {
                            return response;
                        }
                        else {
                            throw new Error(response.statusText);
                        }
                    })
                        .then(negociacoes => {
                        negociacoes.forEach((negociacao) => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.logarTempoDeExecucao(true),
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importarDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 2] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
