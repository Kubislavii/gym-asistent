import exercises from './exercises.json'

export type Equipment = 'cinky' | 'kettlebell' | 'stroje' | 'bench' | 'telo'
export type Group = 'Nohy' | 'Hrudník' | 'Záda' | 'Ramena' | 'Ruce' | 'Core'

export interface Exercise {
  id: string
  group: Group
  name: string
  /** Exercise is available only when ALL of these items are free. */
  eq: Equipment[]
  reps: string
  rest: string
  /** 1–10, higher = more demanding. */
  difficulty: number
  how: string[]
  mistake: string
  /** Paths relative to the app base: start and end of the movement. */
  images: string[]
  videoQuery: string
}

/** Order within a group is the selection priority when building a plan. */
export const CATALOG = exercises as Exercise[]

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  cinky: 'Činky',
  kettlebell: 'Kettlebell',
  stroje: 'Stroje',
  bench: 'Bench',
  telo: 'Vlastní tělo',
}

export const GROUP_LABELS: Record<Group, string> = {
  Nohy: 'Nohy',
  Hrudník: 'Hrudník',
  Záda: 'Záda',
  Ramena: 'Ramena',
  Ruce: 'Ruce',
  Core: 'Core (břicho)',
}

export function difficultyLabel(difficulty: number): string {
  if (difficulty >= 8) return 'Těžký'
  if (difficulty >= 5) return 'Střední'
  return 'Lehký'
}

export function imageUrl(path: string): string {
  return import.meta.env.BASE_URL + path
}

export function videoUrl(exercise: Exercise): string {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(exercise.videoQuery)
}
