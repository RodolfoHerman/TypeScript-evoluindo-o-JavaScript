//Em um sistema legado uma variável as vezes é do tipo STRING e as vezes do tipo NUMBER.
//Podemos utilizar o UNION TYPE para dizer que a variável do assinatura do método
//pode ser dos dois tipos. Assim o método aceita NUMBER ou STRING como parâmetro 
function processaToken(token: string | number) {

    //Para fazer o tratamento da variável, caso seja STRING ou caso seja NUMBER
    //podemos utulizar o TYPE GUARD para verificar qual o tipo estamos lidando
    if(typeof(token) == 'string') {

        //typescript entende que é o tipo string e faz autocomplete para este tipo. 
        //A função replace só existe em string
        return token.replace(/2/g,'X');

    } else {

        //toFixed só existe em mumber!
        return token.toFixed().replace(/2/g,'X');
    }

}

const tokenProcessado1 = processaToken('1234');
const tokenProcessado2 = processaToken(1234);

//Podemos simplificar e padronizar o UNION TYPE através do TYPE ALIAS.
//Assim o código ficará mais limpo

//meuTipoDeToken é um alias
type meuTipoDeToken = string | number;

function processaToken_2 (token: meuTipoDeToken) {

}