import type { Ref } from 'vue'

interface GameState {
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

  whoScored(homeScore: number, awayScore: number) {
    if (Math.random() < this.shotProbPerMinute) {
      if (Math.random() < this.homeShotPercentage) {
        if (Math.random() < this.homeXGPerShot)
          homeScore += 1
          // this.state.value.homeGoalLog += `${this.state.value.timing}', `
      }
      else {
        if (Math.random() < this.awayXGPerShot)
          awayScore += 1
          // this.state.value.awayGoalLog += `${this.state.value.timing}', `
      }
    }
    return [homeScore, awayScore]
  }

  play(fulltime = 90, delay = 100) {
    this.reset()
    this.state.value.played = true
    const intervalId = setInterval(() => {
      const [homeScore, awayScore] = this.whoScored(0, 0)
      if (homeScore) {
        this.state.value.homeScore += 1
        this.state.value.homeGoalLog += `${this.state.value.timing}', `
      }
      else if (awayScore) {
        this.state.value.awayScore += 1
        this.state.value.awayGoalLog += `${this.state.value.timing}', `
      }

      this.state.value.timing += 1

      if (this.state.value.timing >= fulltime)
        clearInterval(intervalId)
    }, delay)
  }

  reset() {
    this.state.value = {
      homeScore: 0,
      awayScore: 0,
      timing: 0,
      homeGoalLog: '',
      awayGoalLog: '',
    }
  }
}
