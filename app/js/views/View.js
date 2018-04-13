System.register(["../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, View;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            View = class View {
                //Utilizando a '?' para informar que é um parâmetro opcional.
                //Se não passar o parâmetro ele virá como UNDEFINED e é avaliado com FALSE
                //Obs: parâmetros opcionais sempre são os ultimos parâmetros da assinatura do método
                // constructor(seletor: string, scape?: boolean) {
                //Ativando o STRICTNULLCHECKS o operador ELVIS não pode ser usado pois ele define a variável como UNDEFINED ou NULL
                //Sendo assim atribuímos um valor padrão à ela
                constructor(seletor, scape = false) {
                    this._elemento = $(seletor);
                    this._scape = scape;
                }
                update(negociacoes) {
                    let template = this.template(negociacoes);
                    if (this._scape) {
                        //Substituir todas as ocorrencias de <script> e </script> e seu conteudo por ''
                        template = template.replace(/<script>[\s\S]*?<\/script>/, '');
                    }
                    this._elemento.html(template);
                }
            };
            __decorate([
                index_1.logarTempoDeExecucao(true)
            ], View.prototype, "update", null);
            exports_1("View", View);
        }
    };
});
