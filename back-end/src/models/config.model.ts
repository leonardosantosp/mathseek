// esse schema contem todos as preferencias do usuario
import { Schema } from 'mongoose'

// tipagem do schema folders
interface InterfaceFolders {
  folderName: string
  wikipages: number[]
}

//tipagem do schema user
export interface InterfaceConfig {
  backgroundImage: string
  favorite: [number]
  fontFamily: string
  folders: InterfaceFolders[]
  outputMethod: 'sameScreen' | 'diffScreen' // sameScreen na mesma tela do inicio
  // diffScreen redireciona para tela de resultados
  quickAccess: [number]
  themeColor: string
}

const folderSchema = new Schema<InterfaceFolders>(
  {
    folderName: {
      type: String,
      required: false
    },
    wikipages: {
      type: [Number],
      default: []
    }
  },
  { _id: false }
)

export const configSchema = new Schema<InterfaceConfig>( // garantindo que o schema seja equivalente a interface
  {
    backgroundImage: {
      type: String,
      default: ''
    },
    favorite: {
      // lista
      type: [Number],
      default: () => []
    },
    fontFamily: {
      type: String,
      default: ''
    },
    folders: {
      // vai ser uma lista de objetos. dentro de folders -> folder -> wikipages (id : inteiro)
      type: [folderSchema],
      default: []
    },
    outputMethod: {
      type: String,
      enum: ['sameScreen', 'diffScreen'],
      default: 'diffScreen'
    },
    quickAccess: {
      type: [Number],
      default: () => []
    },
    themeColor: {
      type: String,
      default: ''
    }
  },

  { _id: false } // nao precisamos de um id para config ja vai estar importado em user
)
