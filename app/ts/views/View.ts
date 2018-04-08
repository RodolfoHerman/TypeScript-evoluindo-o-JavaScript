export abstract class View<T> {

    private _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor);
    }

    update(negociacoes: T): void {

        this._elemento.html(this.template(negociacoes));
    }

    abstract template(model: T): string;

}