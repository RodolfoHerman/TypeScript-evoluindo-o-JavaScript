System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //Realizar a atribuição do elemento DOM de forma LAZY LOADING
    //Em vez de carregador todos os elementos do DOM no contrutor do CONTROLLER ele acrrega o elemento uma unica vez
    //caso já tenha carregado ele retorna sua intância.
    //Criamos um decorator que realiza injeção de elementos do DOM com o padrão lazy loading.
    function domInject(seletor) {
        return function (target, key) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    console.log(`Atribuindo ${seletor} para ${key}`);
                    elemento = $(seletor);
                }
                return elemento;
            };
            //Necessário essa função para atribuir um getter a nossa função 'getter'.
            //Ao chamar o elemento no controller o 'getter' se comportará como uma property do objeto mesmo escrevendo um bloco de código
            //E será retornado o seleteor correspondente
            //Parâmetros: a property é o TARGET, key é o NOME da property e o terceiro parâmetro
            //é como definir a property (um getter ou um setter)
            Object.defineProperty(target, key, {
                //Aqui queremos um 'get' em vez de 'set' e passa qual a função que assumirá o 'get' no caso é a funão 'getter' acima
                get: getter
            });
            // OBS: Criamos uma função que será nosso getter, mas como faremos a substituição da propriedade alvo do decorator 
            // pelo getter que criamos? Faremos isso com auxílio de Object.defineProperty:
        };
    }
    exports_1("domInject", domInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
