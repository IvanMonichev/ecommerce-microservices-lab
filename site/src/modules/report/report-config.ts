import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import type { StackKey } from '@/modules/report/report.types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

export const STACK_META: Record<
  StackKey,
  { label: string; accent: string; soft: string }
> = {
  go: {
    label: 'Go / Fiber',
    accent: '#19656f',
    soft: 'rgba(25, 101, 111, 0.12)',
  },
  ts: {
    label: 'TypeScript / Express',
    accent: '#7a34f3',
    soft: 'rgba(122, 52, 243, 0.12)',
  },
}
