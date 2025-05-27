// esse schema contem todos as preferencias do usuario
import { Schema } from "mongoose";
import mongoose from "mongoose";

//tipagem do schema
export interface InterfaceConfig{
    backgroundImage: string,    
    favorite: string,
    fontFamily: string,
    outputMethod: 'sameScreen' | 'diffScreen', // sameScreen na mesma tela do inicio
                                               // diffScreen redireciona para tela de resultados  
    themeColor: string
}

export const configSchema = new Schema<InterfaceConfig>( // garantindo que o schema seja equivalente a interface
    {
        backgroundImage: {
            type: String,
            default: ''
        },
        favorite: {
            type: String,
            default: ''
        },
        fontFamily: {
            type: String,
            default: ''
        },
        outputMethod: {
            type: String,
            enum: ['sameScreen', 'diffScreen'], 
            default: 'diffScreen'
        },
        themeColor: {
            type: String,
            default: ''
        }
    },
    { _id: false } // nao precisamos de um id para config ja vai estar importado em user
)

