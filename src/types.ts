export interface Match {
  name: string
  utc_time: string
  finished: boolean
  competition: {
    name: string
    logo: string
  }
  home: {
    name: string
    logo: string
    shots: number
    xg: number
    score: number
    played: number
  }
  away: {
    name: string
    logo: string
    shots: number
    xg: number
    score: number
    played: number
  }
}
