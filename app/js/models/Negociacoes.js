System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacoes;
    return {
        setters: [],
        execute: function () {
            ////Melhor abordagem é atrvés de INTERFACE
            //export class Negociacoes extends Imprimivel {
            //export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {
            //Novo jeito de implementar interface
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                //Outro modo de delcarar Array sem o diamante
                //private _negociacoes: Negociacao[] = [];
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                //Como colocamos o 'STRICTNULLCHECKS' e ele não deixa retorna outro valor a não ser
                //um array do tipo especificado na assinatura da função.
                //Podemos especificar para a função mais de um tipo de retorno colocando o pipe '|'
                //Neste caso a função retorna o array ou retorna null 
                //paraArray(): Array<Negociacao> | null {
                paraArray() {
                    //Ativando o STRICTNULLCHECKS o array vazio [] pode receber
                    //qualquer tipo de formato, sendo assim é necessário tipa-lo como um array de Negociacao
                    //return [].concat(this._negociacoes);
                    return [].concat(this._negociacoes);
                }
                //Implementação do contrato da interface
                paraTexto() {
                    console.log("--- Para texto ---");
                    console.log(JSON.stringify(this._negociacoes));
                }
                //Implementação do contrato da interface
                ehIgual(negociacoes) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
