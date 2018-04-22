import { Negociacao } from './Negociacao';
// import { Imprimivel } from './Imprimivel';
// import { Igualavel } from './Igualavel';

import { MeuObjeto } from './MeuObjeto';

////Melhor abordagem é atrvés de INTERFACE
//export class Negociacoes extends Imprimivel {

//export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {

//Novo jeito de implementar interface
export class Negociacoes implements MeuObjeto<Negociacoes> {
    
    private _negociacoes: Array<Negociacao> = [];
    //Outro modo de delcarar Array sem o diamante
    //private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    //Como colocamos o 'STRICTNULLCHECKS' e ele não deixa retorna outro valor a não ser
    //um array do tipo especificado na assinatura da função.
    //Podemos especificar para a função mais de um tipo de retorno colocando o pipe '|'
    //Neste caso a função retorna o array ou retorna null 
    //paraArray(): Array<Negociacao> | null {
    paraArray(): Negociacao[] {

        //Ativando o STRICTNULLCHECKS o array vazio [] pode receber
        //qualquer tipo de formato, sendo assim é necessário tipa-lo como um array de Negociacao
        //return [].concat(this._negociacoes);
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    //Implementação do contrato da interface
    paraTexto(): void {

        console.log("--- Para texto ---");
        console.log(JSON.stringify(this._negociacoes));
    }

    //Implementação do contrato da interface
    ehIgual(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }

}