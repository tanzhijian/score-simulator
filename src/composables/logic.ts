import type { Ref } from 'vue'

interface GameState {
  homeShots: number
  awayShots: number
  homeScore: number
  awayScore: number
  timing: number
  homeGoalLog: string
  awayGoalLog: string
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
    public awayShots: number,
    public awayXG: number,
  ) {
    this.reset()
    this.state.value.played = false
    this.homeXGPerShot = homeXG / homeShots
    this.awayXGPerShot = awayXG / awayShots
    this.homeShotPercentage = homeShots / (homeShots + awayShots)
    this.shotProbPerMinute = (homeShots + awayShots) / 38 / 90
  }

  attack(
    homeShot: number,
    awayShot: number,
    homeScore: number,
    awayScore: number,
  ) {
    if (Math.random() < this.shotProbPerMinute) {
      if (Math.random() < this.homeShotPercentage) {
        homeShot = 1
        if (Math.random() < this.homeXGPerShot)
          homeScore = 1
      }
      else {
        awayShot = 1
        if (Math.random() < this.awayXGPerShot)
          awayScore = 1
      }
    }
    return [homeShot, awayShot, homeScore, awayScore]
  }

  play(fulltime = 90, delay = 100) {
    this.reset()
    this.state.value.played = true
    const intervalId = setInterval(() => {
      const [homeShot, awayShot, homeScore, awayScore] = this.attack(0, 0, 0, 0)
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

      this.state.value.timing += 1

      if (this.state.value.timing >= fulltime)
        clearInterval(intervalId)
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
    }
  }
}
