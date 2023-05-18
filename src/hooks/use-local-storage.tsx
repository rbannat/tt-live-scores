import { useEffect, useState } from "react"

export const useLocalStorage = (storageKey: string, fallbackState: string) => {
  const initialState: string =
    typeof window !== `undefined`
      ? JSON.parse(localStorage.getItem(storageKey) ?? "") ?? fallbackState
      : fallbackState
  const [value, setValue] = useState(initialState)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}
