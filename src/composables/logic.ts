import type { Ref } from 'vue'

const FULLTIME = 90
const HOME_XG_PER_SHOT = 0.145431
const AWAY_XG_PER_SHOT = 0.119904
const HOME_SHOT_PERCENTAGE = 0.53552
const SHOT_PROB_PER_MINUTE = 0.32869

interface GameState {
  homeScore: number
  awayScore: number
  timing: number
  homeGoalLog: string
  awayGoalLog: string
}

export class Game {
  state = ref() as Ref<GameState>

  constructor() {
    this.reset()
  }

  whoScored() {
    if (Math.random() < SHOT_PROB_PER_MINUTE) {
      if (Math.random() < HOME_SHOT_PERCENTAGE) {
        if (Math.random() < HOME_XG_PER_SHOT) {
          this.state.value.homeScore += 1
          this.state.value.homeGoalLog += `${this.state.value.timing}', `
        }
      }
      else {
        if (Math.random() < AWAY_XG_PER_SHOT) {
          this.state.value.awayScore += 1
          this.state.value.awayGoalLog += `${this.state.value.timing}', `
        }
      }
    }
  }

  play() {
    this.reset()
    const intervalId = setInterval(() => {
      this.whoScored()
      this.state.value.timing += 1

      if (this.state.value.timing >= FULLTIME)
        clearInterval(intervalId)
    }, 100)
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
