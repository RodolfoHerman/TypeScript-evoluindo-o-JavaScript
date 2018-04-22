import { Negociacao, Imprimivel } from '../models/index';

//O problema dessa funcao imprime é que ela recebe 
//apenas o tipo Negociacao como parâmetro impossibilitandode passar 
//o tipo Negociacoes, que é uma classe com um array de Negociacao.
//Resolvemos em parte passando a tipagem para ANY, mas assim podemos passar
//qualquer objeto, ex: Date(), e chamar a função 'paraTexto()' que ocorrerá um problema
//export function imprime(...negociacoes: Negociacao[]) {
//export function imprime(...objetos: any[]) {

//Utilizando classe abstrata 'Imprimivel' para tipar o parâmetro
//e garantir que o método paraTexto possui no objeto, ou seja, a interface dita o 
//comportamento do objeto
export function imprime(...objetos: Imprimivel[]) {

    objetos.forEach(objeto => objeto.paraTexto());
}