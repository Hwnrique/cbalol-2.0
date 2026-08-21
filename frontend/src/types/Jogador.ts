export interface Jogador {
  _id: string
  nome: string
  nickname: string
  foto: string
  role: string
  idade: number
  titulos: string[]
  time?: string
  historico?: string[]
  createdAt: string
  updatedAt: string
}