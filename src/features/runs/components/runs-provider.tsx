import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Run } from '../data/schema'

type RunsDialogType = 'create' | 'update' | 'delete' | 'import'

type RunsContextType = {
  open: RunsDialogType | null
  setOpen: (str: RunsDialogType | null) => void
  currentRow: Run | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Run | null>>
}

const RunsContext = React.createContext<RunsContextType | null>(null)

export function RunsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<RunsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Run | null>(null)

  return (
    <RunsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RunsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRuns = () => {
  const runsContext = React.useContext(RunsContext)

  if (!runsContext) {
    throw new Error('useRuns has to be used within <RunsContext>')
  }

  return runsContext
}
