interface CompetitionTypes {
  name: string
  logo: string
}

interface TeamTypes {
  name: string
  logo: string
  shots: number
  xg: number
  score: number | null
  played: number
}

export interface MatchTypes {
  name: string
  utc_time: string
  finished: boolean
  competition: CompetitionTypes
  home: TeamTypes
  away: TeamTypes
}

export interface MatchesTypes {
  [key: string]: MatchTypes[]
}

export interface Counter {
  [key: string]: number
}
