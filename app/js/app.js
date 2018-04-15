System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoController_1, negociacaoController;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            negociacaoController = new NegociacaoController_1.NegociacaoController();
            //document.querySelector('.form').addEventListener('submit', negociacaoController.adiciona.bind(negociacaoController));
            $('.form').submit(negociacaoController.adiciona.bind(negociacaoController));
            $('#botao-importa').click(negociacaoController.importarDados.bind(negociacaoController));
            //inicialização do compilador:
            //1) npm init (no diret´rotio do projeto)
            //2) é criado o arquivo 'package.json'
            //3) npm install typescript@2.3.2 --save-dev (Solicitação da instalação do TypeScript)
            //4) criação do arquivo 'tsconfig.json'
            // {
            //     "compilerOptions": {
            //         "target": "es6",
            //         "outDir": "app/js"
            //     },
            //     "include": [
            //         "app/ts/**/*"
            //     ]
            // }
            //5) O arquivo 'package.json' ficará assim
            // {
            //     "name": "typescript-evoluindo-o-javascript",
            //     "version": "1.0.0",
            //     "description": "",
            //     "main": "index.js",
            //     "scripts": {
            //       "test": "echo \"Error: no test specified\" && exit 1",
            //       "compile": "tsc",
            //       "start": "tsc -w"
            //     },
            //     "author": "",
            //     "license": "ISC",
            //     "devDependencies": {
            //       "@types/jquery": "^2.0.42",
            //       "typescript": "^2.3.2"
            //     }
            //   }
            //6) Para compilar o código usar o comando 'npm run compile' e para fazer o autoload usar o comando 'npm start'
            //Instalaçao do jquery: npm install @types/jquery@2.0.42 --save-dev
            //Tds que precisamos (JQuery por exemplo)
            //TypeScript Definitions -> JQuery: https://www.npmjs.com/package/@types/jquery
            //Qualquer tds files que esteja dentro de node_modules/@types será lidado automaticamente pelo compilador do TypeScript.
            //Para realizar os imports via LOADER é necessário que a aplicação tenha um servidor para servir as dependênias.
            // O servidor utilizado será o lite-server
            // npm install lite-server@2.3.0 --save-dev
            // "scripts": {
            //     "test": "echo \"Error: no test specified\" && exit 1",
            //     "compile": "tsc",
            //     "start": "tsc -w",
            //     "server": "lite-server --baseDir=app"
            //  },
            //Com o arquivo package.json acima será necessário abrir 2 terminais. Um para rodar o servidor "npm run server" e outro
            //para rodar o compilador em tempo real "npm start". Sendo assim, para rodar os 2 de forma paralela será instalado o módulo
            //"concurrently":
            // npm install concurrently@3.4.0 --save-dev
            // E o arquivo package.json ficará assim:
            // "scripts": {
            //     "test": "echo \"Error: no test specified\" && exit 1",
            //     "compile": "tsc",
            //     "watch": "tsc -w",
            //     "server": "lite-server --baseDir=app",
            //     "start": "concurrently \"npm run watch\" \"npm run server\""
            // }, 
        }
    };
});
