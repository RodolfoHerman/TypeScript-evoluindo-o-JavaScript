// import { Imprimivel } from './Imprimivel';
// import { Igualavel } from './Igualavel';

import { MeuObjeto } from './MeuObjeto';

//Melhor abordagem é atrvés de INTERFACE
//export class Negociacao extends Imprimivel{
//export class Negociacao implements Imprimivel, Igualavel<Negociacao> {

//Novo jeito de implementar interface    
export class Negociacao implements MeuObjeto<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {

        //Necessário chamar o construtor da classe pai pois os tipos de parâmetros
        //e o número de parâmetros são diferentes. como o constructor da classe filha 
        //é diferente da classe pai, fomos obrigados a chamar super() no constructor 
        //da classe filha para que o constructor da classe pai seja chamado
        //Não é mais necessário pois agora é uma interface
        //super();
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

    //Implementação do contrato da interface
    paraTexto(): void {
        console.log("--- Para texto ---");
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
            Volume: ${this.volume}`
        );
    }

    //Implementação do contrato da interface
    ehIgual(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
            && this.quantidade == negociacao.quantidade
            && this.valor == negociacao.valor; 
    }

}