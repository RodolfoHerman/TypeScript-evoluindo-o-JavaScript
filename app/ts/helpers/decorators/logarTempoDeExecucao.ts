export function logarTempoDeExecucao(emSegundos: boolean = false) {

    //O parâmetro 'target' é que possui uma referência para o elemento cujo o método foi decorado com
    //o DECORATOR 'logarTempoDeExecucao'. O segundo parâmetro 'propertyKey' retorna o nome do método
    //que foi decorado. O terceiro parâmetro 'descriptor' é o que dará acesso ao método que será
    //modificado através de sua propriedade 'descriptor.value'
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        //Aqui é sobreescrita do método original. O '...args: any[]' indica
        //que o método que está sendo sobreescrito pode ter vários parâmetros
        //e através do REST OPERATOR transformamos os parâmetros em um array
        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;

            if(emSegundos) {

                unidade = 's';
                divisor = 1000;
            }


            console.log('--------------------------------------------');
            
            console.log(`Parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);

            const t1 = performance.now();

            //Aqui invocamos o método original, guardamos o seu retorno (caso tenha) e o retornamos.
            //O parâmetro 'this' se refere ao contexto (classe pela qual o método original foi invocado)
            //e o parâmetro 'args' são os valores dos parâmetros do método
            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();

            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);

            console.log('--------------------------------------------');

            return retorno;
        }

        return descriptor;
    }

}