import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

    private _elemento: JQuery;
    private _scape: boolean;

    //Utilizando a '?' para informar que é um parâmetro opcional.
    //Se não passar o parâmetro ele virá como UNDEFINED e é avaliado com FALSE
    //Obs: parâmetros opcionais sempre são os ultimos parâmetros da assinatura do método
    // constructor(seletor: string, scape?: boolean) {
    //Ativando o STRICTNULLCHECKS o operador ELVIS não pode ser usado pois ele define a variável como UNDEFINED ou NULL
    //Sendo assim atribuímos um valor padrão à ela
    constructor(seletor: string, scape: boolean = false) {

        this._elemento = $(seletor);
        this._scape = scape;
    }

    @logarTempoDeExecucao(true)
    update(negociacoes: T): void {

        let template = this.template(negociacoes);

        if(this._scape) {

            //Substituir todas as ocorrencias de <script> e </script> e seu conteudo por ''
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        this._elemento.html(template);
    }

    abstract template(model: T): string;

}