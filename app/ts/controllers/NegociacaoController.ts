//ES 2015 define que todo arquivo JS do projeto é um módulo e através das instruções 
//import e export importamos e exportamos artefatos respectivamente.

// import { MensagemView } from '../views/MensagemView';
// import { NegociacoesView } from '../views/NegociacoesView';
// import { Negociacao } from '../models/Negociacao';
// import { Negociacoes } from '../models/Negociacoes';

//Utilizar a técnica BARREl (Barril) para deixar o código mais enxuto para exportar.
//Um barril, ou barrel no inglês é uma maneira de centralizarmos em um único 
//módulo a importação de outros módulos.
import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial, Imprimivel } from '../models/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @domInject('#valor')
    private _inputValor: JQuery;
    
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');
    private _service: NegociacaoService = new NegociacaoService();

    constructor() {

        //let $ = document.querySelector.bind(document);

        //Realizando o casting (utilizamos <> para isso) de um elemento 
        //genérico para um elemento mais específico

        //Utilizando o decorator domInject()
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }

    @logarTempoDeExecucao(true)
    @throttle()
    adiciona() {
    //Como o decorator throttle posterga a execução do método
    //o event.preventDefault() será executado depois, fazendo com que o
    //formulário no browser seja limpado. Sendo assim, o event.preventDefault()
    //é tratado no decaorator throller
    //adiciona(event: Event) {

        //event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));


        if(!this.ehDiaDaSemana(data)) {

            this._mensagemView.update('Negociações só podem ser realizadas em dias uteis');

            return;
        }


        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        //Vai dar erro pois o objeto Date() não possui a função para texto implementada
        //imprime(this._negociacoes, negociacao, new Date());

        //Assinatura do método aceita apenas classes que estende de 'Imprimivel'
        imprime(this._negociacoes, negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociaçao adicionada com sucesso!');
    }

    private ehDiaDaSemana(data: Date) {

        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

    @throttle()
    //Informamos que o método é ASSINCRONO com o 'async', ou seja
    //ao executar o método ele entende que haverá uma parte em seu escopo que terá uma chamada assincrona 'await'
    //e quando chegar na chamada assincrona o método entrará em estado de PAUSA, sairá da pilha de execução, e retornará somente quando houver
    //o retorno da resposta da chamada assincrona 'negociacoesParaImportar'
    async importarDados_2() {
     
        //(Obs: sabemos que uma 'PROMISE' retorna seus dados no THEN, de forma encadeada, ou no CATCH).
        //No nosso caso, o ASYNC/AWAIT não possui o THEN/CATCH da PROMISE
        //mas ele é inteligente o bastante para realizar o tratamento da função utilizando o TRY/CATCH. O TRY/CATCH não pode ser utilizado
        //em códigos assincronos, mas com o SYNC/AWAIT ele entende a instrução TRY/CATCH
        try {

            //Aqui dá ideia de chamada de um método SINCRONO. O 'await' é inteligente o bastante para extrair
            //o resultado do 'THEN' da 'PROMISE' do método 'obterNegociacoes', sendo assim podemos 
            //atribuir o seu resultado direto na variável 'negociacoesParaImportar'.
            const negociacoesParaImportar = await this._service
                                .obterNegociacoes((response: Response) => {
                                                    if(response.ok) {

                                                        return response;
                                                    } else {
                                        
                                                        throw new Error(response.statusText);
                                                    }
                                                }
                                            );
            
            //Após a execução e o retorno do resultado do método assincrono acima, 
            //o método terá seu RESUMO a partir deste ponto
            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar.filter(
                (negociacao: Negociacao) => !negociacoesJaImportadas.some(
                    jaImportado => negociacao.ehIgual(jaImportado)
                )
            ).forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch(err) {

            this._mensagemView.update(err.message);
        }

    }


    //O método abaixo foi substituido por este pois colocamos a lógica de obter negociações
    //em um service (criamos uma classe para essa responsabilidade)
    @throttle()
    importarDados() {

        // function isOk(response: Response) {

        //     if(response.ok) {

        //         return response;
        //     } else {

        //         throw new Error(response.statusText);
        //     }

        // }

        //Utilizando a interface de função para garantir a assinatura correta do método
        const isOk: ResponseHandler = (response: Response) => {

            if(response.ok) {

                return response;
            } else {

                throw new Error(response.statusText);
            }

        };

        //Podemos criar a função diretamente no parâmetro em vez de importar seu tipo como está 
        //na definição de 'isOk' acima 
        //this._service.obterNegociacoes(isOk)
        this._service.obterNegociacoes(
            
            (response: Response) => {
                    
                    if(response.ok) {

                        return response;
                    } else {
        
                        throw new Error(response.statusText);
                    }
                }
            )
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();

                //Evita de importar negociações já imporatdas na tabela
                negociacoesParaImportar.filter(
                    (negociacao: Negociacao) => !negociacoesJaImportadas.some(
                        jaImportado => negociacao.ehIgual(jaImportado)
                    )
                ).forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));

                //Aplicação do FILTRO acima para evitar importar NEGOCIACOES iguais
                //negociacoesParaImportar.forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
            })
            .catch((err: Error) => this._mensagemView.update(err.message));


    }


    // @throttle()
    // importarDados() {

        //Criar uma função para validar o response
        //pois como consta na documentação um 404 não é constituido de um erro de internet
        //https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch 
        
        // function isOk(response: Response) {

        //     if(response.ok) {

        //         return response;
        //     } else {

        //         throw new Error(response.statusText);
        //     }

        // }

        //Utilização da API Fetch.
        //Ele é baseada no padrão de projeto Promise, sendo assim
        //as respostas dos métodos são encadeadas e o acesso é realizado pelo 'then'.
        //As respostas são dadas no objeto do tipo RESPONSE e ele possui diversos método para trabalho,
        //por exemplo o método .json()
        
        // fetch('http://localhost:8080/dados')
        //     .then(res => isOk(res))
        //     .then(res => res.json())
        //     //dados é um array de objetos JSON retornado pelo res.json()
        //     .then((dados: NegociacaoParcial[]) => {
        //         dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        //         .forEach(negociacao => this._negociacoes.adiciona(negociacao));

        //         this._negociacoesView.update(this._negociacoes);
        //     })
        // .catch(error => console.log(error));
        
//     }

}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado

}