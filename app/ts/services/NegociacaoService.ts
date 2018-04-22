import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

    //Passamos uma função (handler) por parâmetro para deixar os critérios de validação
    //do 'response' para cada tipo de requisição. Assim o método fica flexivel
    //e o programador pode aplicar outros critérios de validação
    
    //obterNegociacoes(handler: Function): Promise<any> {

    //Em vez de receber um tipo genérico de função no parâmetro utilizamos uma interface de função indicando
    //como deve ser a assinatura e o retorno da função para evitar erros caso passamos uma função que retorna void
    //por exemplo 
    obterNegociacoes(handler: ResponseHandler): Promise<any> {
        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível importar as negociações !');
            });

    }
}

export interface ResponseHandler {

    (res: Response): Response;
}