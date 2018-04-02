let negociacaoController = new NegociacaoController();

//document.querySelector('.form').addEventListener('submit', negociacaoController.adiciona.bind(negociacaoController));

$('.form').submit(negociacaoController.adiciona.bind(negociacaoController));

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