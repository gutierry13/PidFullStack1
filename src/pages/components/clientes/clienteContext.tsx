import { createContext, useEffect, useState } from 'react'
import { api } from '../../../services/api'
interface ClientesTypes {
  cpf: string
  nome: string
  dtNascimento: Date | string
  email: string
  telefone: string
  ocupacao: string
  sexo: string
  estadoCivil: string
  cep: string
}
interface ClienteProviderProps {
  children: React.ReactNode
}
interface ClientesContextData {
  clientes: ClientesTypes[]
  createCliente: (cliente: ClientesTypes) => Promise<void>
  updateCliente: (cliente: ClientesTypes) => Promise<void>
  deleteCliente: (clienteCpf: String) => Promise<void>
}
export const ClienteContext = createContext<ClientesContextData>(
  {} as ClientesContextData,
)
export function ClienteProvider({ children }: ClienteProviderProps) {
  const [clientes, setClientes] = useState<ClientesTypes[]>([])
  useEffect(() => {
    api.get('/clientes').then((response) => setClientes(response.data))
    // fetch('http://localhost:3001/clientes').then((response) =>response.json()).then((data) => setClientes(data))
  }, [])
  async function createCliente(clienteInput: ClientesTypes) {
    //  fetch('http://localhost:3001/clientes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     cpf: clienteInput.cpf,
    //     nome: clienteInput.nome,
    //     dtNascimento: clienteInput.dtNascimento,
    //     email: clienteInput.email,
    //     telefone: clienteInput.telefone,
    //     ocupacao: clienteInput.ocupacao,
    //     sexo: clienteInput.sexo,
    //     estadoCivil: clienteInput.estadoCivil,
    //     cep: clienteInput.cep,
    //   })
    // }).then((response) => response.json()).then(cliente => setClientes([...clientes, cliente]))
    const response = await api.post('/clientes', clienteInput)
    const { data } = response.config
    setClientes([...clientes, JSON.parse(data)])
  }
  async function updateCliente(clienteInput: ClientesTypes) {
    await api.put(`/clientes`, clienteInput)

    clientes.forEach((cliente) => {
      if (cliente.cpf === clienteInput.cpf) {
        cliente.nome = clienteInput.nome
        cliente.dtNascimento = clienteInput.dtNascimento
        cliente.email = clienteInput.email
        cliente.telefone = clienteInput.telefone
        cliente.ocupacao = clienteInput.ocupacao
        cliente.sexo = clienteInput.sexo
        cliente.cep = clienteInput.cep
        cliente.estadoCivil = clienteInput.estadoCivil
      }
    })
  }
  async function deleteCliente(clienteCpf: String) {
    await api
      .delete(`/clientes`, {
        data: {
          cpf: clienteCpf,
        },
      })
      .then((response) =>
        setClientes(clientes.filter((cliente) => cliente.cpf !== clienteCpf)),
      )
  }
  return (
    <ClienteContext.Provider
      value={{ clientes, createCliente, updateCliente, deleteCliente }}
    >
      {children}
    </ClienteContext.Provider>
  )
}
