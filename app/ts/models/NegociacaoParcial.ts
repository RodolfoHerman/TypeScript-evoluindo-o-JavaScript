//Vantagem da interface: poder acessar uma API de fora definir tipos para essa API,
//e se alguém alterar a API e não for de acordo com a interface irá apresentar um erro
//em runtime sendo assim fica fácil indentifcar o erro e quando alterar o nome da variável
//na interface todos os locais que a utiliza irá apresentar erro de compilação mostrando os locais
//que devem ser trocados tais erros. Essa forma é bem mais enxuta e mais fácil do que criar uma classe
//NegociacaoParcial e realizar instanciação dela e atribuir os valores 
export interface NegociacaoParcial {

    vezes: number;
    montante: number;

}