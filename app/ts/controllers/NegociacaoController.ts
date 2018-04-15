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
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';

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

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociaçao adicionada com sucesso!');
    }

    private ehDiaDaSemana(data: Date) {

        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
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
            .then(negociacoes => {

                negociacoes.forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
            });


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