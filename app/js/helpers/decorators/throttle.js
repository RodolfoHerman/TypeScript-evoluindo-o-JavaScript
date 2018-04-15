System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //Padrão de projeto throttle evita que o usuário dispare várias ações ao servidor
    //
    function throttle(milessegundos = 500) {
        return function (target, key, descriptor) {
            const metodoOriginal = descriptor.value;
            let timer = 0;
            descriptor.value = function (...args) {
                //Em métodos de evento (como o método adiciona() no controller) existe 
                //a variável 'event' implicitamente. Essa variável implicita pode ser acessada
                //em qualquer lugar do código. Sendo assim quando o evento do submit de formulário
                //for disparado essa variável estará presente no código e executamos o preventDefault().
                if (event) {
                    event.preventDefault();
                }
                //Se o usuário clicar em menos de meio segundo a ação (o temporizador) será 
                //cancelada e logo abaixo será iniciada uma nova
                clearInterval(timer);
                timer = setTimeout(() => metodoOriginal.apply(this, args), milessegundos);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});
