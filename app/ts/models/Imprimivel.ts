//Através de uma variável de referência de um tipo eu posso acessar
//um obejto na memória de outro tipo (polimorfismo).
//Isso acontece com as duas classes Negociacao e Negociacoes
// export abstract class Imprimivel {

//     abstract paraTexto(): void;
// }

//Em vez de utilizar uma classe abstrata que não possui nenhum método concreto,
//a melhor implmentação seria através de INTERFACE. Com uma INTERFACE criamos um contrato
//para as classes que a implementa, sendo assim, todas as classes que implementam
//a interface obrigatoriamente terá de que impleentar o método ou métodos da interface.

export interface Imprimivel {

    paraTexto(): void;
}