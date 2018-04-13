export class Negociacao {
    
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

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

}