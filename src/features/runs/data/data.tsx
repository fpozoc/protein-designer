import {
  CheckCircle,
  Timer,
  HelpCircle,
  XCircle,
  Cpu,
  Dna,
  FlaskConical,
  Atom,
} from 'lucide-react'

export const models = [
  {
    value: 'rfdiffusion',
    label: 'RFdiffusion',
    icon: Dna,
  },
  {
    value: 'proteinmpnn',
    label: 'ProteinMPNN',
    icon: Atom,
  },
  {
    value: 'alphafold',
    label: 'AlphaFold',
    icon: FlaskConical,
  },
  {
    value: 'ligandmpnn',
    label: 'LigandMPNN',
    icon: Cpu,
  },
]

export const statuses = [
  {
    label: 'Queued',
    value: 'queued',
    icon: HelpCircle,
  },
  {
    label: 'Running',
    value: 'running',
    icon: Timer,
  },
  {
    label: 'Completed',
    value: 'completed',
    icon: CheckCircle,
  },
  {
    label: 'Failed',
    value: 'failed',
    icon: XCircle,
  },
]
