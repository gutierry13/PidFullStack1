import React, { useState } from 'react'
import { createContext } from 'use-context-selector'
interface ModalProviderProps {
  children: React.ReactNode
}
interface ModalContextType {
  OpenModal: () => void
  CloseModal: () => void
  isModalOpen: boolean
  selectedAnimal: {}
  changeSelectedAnimal: (animal: string) => void
}
export const ModalContext = createContext({} as ModalContextType)
export function AnimalModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState('')
  function changeSelectedAnimal(animal: string) {
    setSelectedAnimal(animal)
  }
  function OpenModal() {
    setIsModalOpen(true)
  }
  function CloseModal() {
    setIsModalOpen(false)
  }
  return (
    <ModalContext.Provider
      value={{
        OpenModal,
        CloseModal,
        isModalOpen,
        selectedAnimal,
        changeSelectedAnimal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
