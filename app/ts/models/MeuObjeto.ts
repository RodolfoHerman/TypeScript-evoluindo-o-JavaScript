//Criando uma interface que estende as interfaces em comum dos objetos e
//evitando assim de ficar colocando na assinatura das classes implementadoras
//as diversas interfaces

import { Igualavel } from './Igualavel';
import { Imprimivel } from './Imprimivel';

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {}