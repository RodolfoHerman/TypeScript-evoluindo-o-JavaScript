//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
//import e export importamos e exportamos artefatos respectivamente.
System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../services/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, DiaDaSemana;
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
            },
            function (index_5_1) {
                index_5 = index_5_1;
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
                    //Vai dar erro pois o objeto Date() não possui a função para texto implementada
                    //imprime(this._negociacoes, negociacao, new Date());
                    //Assinatura do método aceita apenas classes que estende de 'Imprimivel'
                    index_5.imprime(this._negociacoes, negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociaçao adicionada com sucesso!');
                }
                ehDiaDaSemana(data) {
                    return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
                }
                importarDados_2() {
                    return __awaiter(this, void 0, void 0, function* () {
                        //(Obs: sabemos que uma 'PROMISE' retorna seus dados no THEN, de forma encadeada, ou no CATCH).
                        //No nosso caso, o ASYNC/AWAIT não possui o THEN/CATCH da PROMISE
                        //mas ele é inteligente o bastante para realizar o tratamento da função utilizando o TRY/CATCH. O TRY/CATCH não pode ser utilizado
                        //em códigos assincronos, mas com o SYNC/AWAIT ele entende a instrução TRY/CATCH
                        try {
                            //Aqui dá ideia de chamada de um método SINCRONO. O 'await' é inteligente o bastante para extrair
                            //o resultado do 'THEN' da 'PROMISE' do método 'obterNegociacoes', sendo assim podemos 
                            //atribuir o seu resultado direto na variável 'negociacoesParaImportar'.
                            const negociacoesParaImportar = yield this._service
                                .obterNegociacoes((response) => {
                                if (response.ok) {
                                    return response;
                                }
                                else {
                                    throw new Error(response.statusText);
                                }
                            });
                            //Após a execução e o retorno do resultado do método assincrono acima, 
                            //o método terá seu RESUMO a partir deste ponto
                            const negociacoesJaImportadas = this._negociacoes.paraArray();
                            negociacoesParaImportar.filter((negociacao) => !negociacoesJaImportadas.some(jaImportado => negociacao.ehIgual(jaImportado))).forEach((negociacao) => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                        catch (err) {
                            this._mensagemView.update(err.message);
                        }
                    });
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
                        .then(negociacoesParaImportar => {
                        const negociacoesJaImportadas = this._negociacoes.paraArray();
                        //Evita de importar negociações já imporatdas na tabela
                        negociacoesParaImportar.filter((negociacao) => !negociacoesJaImportadas.some(jaImportado => negociacao.ehIgual(jaImportado))).forEach((negociacao) => this._negociacoes.adiciona(negociacao));
                        //Aplicação do FILTRO acima para evitar importar NEGOCIACOES iguais
                        //negociacoesParaImportar.forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    })
                        .catch((err) => this._mensagemView.update(err.message));
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
                //Informamos que o método é ASSINCRONO com o 'async', ou seja
                //ao executar o método ele entende que haverá uma parte em seu escopo que terá uma chamada assincrona 'await'
                //e quando chegar na chamada assincrona o método entrará em estado de PAUSA, sairá da pilha de execução, e retornará somente quando houver
                //o retorno da resposta da chamada assincrona 'negociacoesParaImportar'
            ], NegociacaoController.prototype, "importarDados_2", null);
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
