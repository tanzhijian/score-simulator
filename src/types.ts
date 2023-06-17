export interface Match {
  id: number
  competition: {
    name: string
    emblem: string
  }
  start_time: string
  home_team: {
    name: string
    crest: string
    shots: number
    xg: number
  }
  away_team: {
    name: string
    crest: string
    shots: number
    xg: number
  }
}
