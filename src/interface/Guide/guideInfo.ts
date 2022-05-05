//IMPORTAMOS la interfaz de info adeicional
import { Information } from './info';

// Interfas de guia de informacion
export interface GuideInfo {
    id ?:number;
    document ?: string;
    information : Information;
}