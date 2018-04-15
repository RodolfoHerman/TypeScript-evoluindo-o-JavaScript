//Padrão de projeto throttle evita que o usuário dispare várias ações ao servidor
//
export function throttle(milessegundos = 500) {

    return function(target: any, key: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        let timer = 0;

        descriptor.value = function(...args: any[]) {

            //Em métodos de evento (como o método adiciona() no controller) existe 
            //a variável 'event' implicitamente. Essa variável implicita pode ser acessada
            //em qualquer lugar do código. Sendo assim quando o evento do submit de formulário
            //for disparado essa variável estará presente no código e executamos o preventDefault().
            if(event) {

                event.preventDefault();
            }

            //Se o usuário clicar em menos de meio segundo a ação (o temporizador) será 
            //cancelada e logo abaixo será iniciada uma nova
            clearInterval(timer);

            timer = setTimeout(() => metodoOriginal.apply(this, args), milessegundos);

        }


        return descriptor;
    }


}