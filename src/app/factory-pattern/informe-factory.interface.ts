// informe-factory.interface.ts
import { Informe } from "./informe.interface";

export interface InformeFactory {
    crearInforme(): Informe;
}