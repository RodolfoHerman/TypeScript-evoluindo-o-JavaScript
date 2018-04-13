System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacao;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(data, quantidade, valor) {
                    this.data = data;
                    this.quantidade = quantidade;
                    this.valor = valor;
                }
                //Toda vez que temos um objeto que possui apenas propriedades de leitura.
                //Podemos utilizar o 'readonly' que evita a criação dos get's e as propriedades 
                //do objeto continuam tendo acesso por get. Obs: se a propriedade for apenas
                //acessivel dentro do objeto necessário manter o private
                // get data() {
                //     return this._data;
                // }
                // get quantidade() {
                //     return this._quantidade;
                // }
                // get valor() {
                //     return this._valor;
                // }
                get volume() {
                    return this.quantidade * this.valor;
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
