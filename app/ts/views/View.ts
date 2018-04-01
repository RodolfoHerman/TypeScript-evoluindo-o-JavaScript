abstract class View<T> {

    private _elemento: Element;

    constructor(seletor: string) {

        this._elemento = document.querySelector(seletor);
    }

    update(negociacoes: T): void {

        this._elemento.innerHTML = this.template(negociacoes);
    }

    abstract template(model: T): string;

}