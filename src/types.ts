export interface Match {
  id: string
  competition: {
    code: string
    name: string
    logo: string
  }
  start_time: string
  finished: boolean
  home_team: {
    name: string
    logo: string
    shots: number
    xg: number
    score: number
  }
  away_team: {
    name: string
    logo: string
    shots: number
    xg: number
    score: number
  }
}
