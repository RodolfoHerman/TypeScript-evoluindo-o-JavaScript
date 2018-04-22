System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, NegociacaoService;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                //Passamos uma função (handler) por parâmetro para deixar os critérios de validação
                //do 'response' para cada tipo de requisição. Assim o método fica flexivel
                //e o programador pode aplicar outros critérios de validação
                //obterNegociacoes(handler: Function): Promise<any> {
                //Em vez de receber um tipo genérico de função no parâmetro utilizamos uma interface de função indicando
                //como deve ser a assinatura e o retorno da função para evitar erros caso passamos uma função que retorna void
                //por exemplo 
                obterNegociacoes(handler) {
                    return fetch('http://localhost:8080/dados')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(), dado.vezes, dado.montante)))
                        .catch(err => {
                        console.log(err);
                        throw new Error('Não foi possível importar as negociações !');
                    });
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
