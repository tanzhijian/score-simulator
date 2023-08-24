import type { Ref } from 'vue'

interface GameState {
  homeShots: number
  awayShots: number
  homeScore: number
  awayScore: number
  timing: number
  homeGoalLog: string
  awayGoalLog: string
  shotsProgress: string
  XGProgress: string
  played?: boolean
}

export class Game {
  state = ref() as Ref<GameState>

  homeXGPerShot: number
  awayXGPerShot: number
  homeShotPercentage: number
  shotProbPerMinute: number

  constructor(
    public homeShots: number,
    public homeXG: number,
    public homeMatchesPlayed: number,
    public awayShots: number,
    public awayXG: number,
    public awayMatchesPlayed: number,
  ) {
    this.reset()
    this.state.value.played = false
    this.homeXGPerShot = homeXG / homeShots
    this.awayXGPerShot = awayXG / awayShots
    this.homeShotPercentage = homeShots / (homeShots + awayShots)
    this.shotProbPerMinute
      = (homeShots + awayShots)
      / ((homeMatchesPlayed + awayMatchesPlayed) / 2)
      / 90
  }

  buildProgressBar(progress: number) {
    let bar = ''
    for (let i = 1; i <= 10; i++)
      bar += progress >= i * 10 ? '█' : '░'
    return bar
  }

  attack() {
    let homeShot = 0
    let awayShot = 0
    let homeScore = 0
    let awayScore = 0
    let homeShotXG = 0
    let awayShotXG = 0

    if (Math.random() < this.shotProbPerMinute) {
      if (Math.random() < this.homeShotPercentage) {
        homeShot = 1
        homeShotXG = Math.random()
        if (homeShotXG < this.homeXGPerShot)
          homeScore = 1
      }
      else {
        awayShot = 1
        awayShotXG = Math.random()
        if (awayShotXG < this.awayXGPerShot)
          awayScore = 1
      }
    }
    return [homeShot, awayShot, homeScore, awayScore, homeShotXG, awayShotXG]
  }

  play(fulltime = 90, delay = 100) {
    this.reset()
    this.state.value.played = true

    let homeXG = 0
    let awayXG = 0

    const intervalId = setInterval(() => {
      const [homeShot, awayShot, homeScore, awayScore, homeShotXG, awayShotXG]
        = this.attack()
      this.state.value.homeShots += homeShot
      this.state.value.awayShots += awayShot
      if (homeScore) {
        this.state.value.homeScore += homeScore
        this.state.value.homeGoalLog += `${this.state.value.timing}', `
      }
      else if (awayScore) {
        this.state.value.awayScore += awayScore
        this.state.value.awayGoalLog += `${this.state.value.timing}', `
      }

      let process = 50
      const allShots = this.state.value.homeShots + this.state.value.awayShots
      if (allShots > 0)
        process = this.state.value.homeShots / (allShots) * 100
      this.state.value.shotsProgress = this.buildProgressBar(process)

      this.state.value.timing += 1

      homeXG += homeShotXG
      awayXG += awayShotXG

      if (this.state.value.timing >= fulltime) {
        clearInterval(intervalId)

        this.state.value.XGProgress = this.buildProgressBar(
          homeXG / (homeXG + awayXG) * 100,
        )
      }
    }, delay)
  }

  reset() {
    this.state.value = {
      homeShots: 0,
      awayShots: 0,
      homeScore: 0,
      awayScore: 0,
      timing: 0,
      homeGoalLog: '',
      awayGoalLog: '',
      shotsProgress: '',
      XGProgress: '',
    }
  }
}
