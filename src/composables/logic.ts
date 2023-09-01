import type { Ref } from 'vue'

interface GameState {
  homeShots: number
  awayShots: number
  homeScore: number
  awayScore: number
  homeXG: number
  awayXG: number
  timing: number
  homeGoalLog: string
  awayGoalLog: string
  shotsProgress: string
  xgProgress: string
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

  generateXG(mu: number, sigma = 0.1) {
    // 使用逆变换法生成正态分布的随机数来得到 xg
    // 标准差先使用一点假设的数值
    const u = Math.random()
    const z
      = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random())

    let xg = mu + sigma * z
    if (xg <= 0)
      xg = 0.01
    else if (xg > 1)
      xg = 0.99

    return xg
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
        homeShotXG = this.generateXG(this.homeXGPerShot)
        if (Math.random() < this.homeXGPerShot)
          homeScore = 1
      }
      else {
        awayShot = 1
        awayShotXG = this.generateXG(this.awayXGPerShot)
        if (Math.random() < this.awayXGPerShot)
          awayScore = 1
      }
    }
    return [homeShot, awayShot, homeScore, awayScore, homeShotXG, awayShotXG]
  }

  play(fulltime = 90, delay = 100) {
    this.reset()
    this.state.value.played = true

    const intervalId = setInterval(() => {
      const [homeShot, awayShot, homeScore, awayScore, homeShotXG, awayShotXG]
        = this.attack()
      this.state.value.homeShots += homeShot
      this.state.value.awayShots += awayShot
      this.state.value.homeXG += homeShotXG
      this.state.value.awayXG += awayShotXG
      if (homeScore) {
        this.state.value.homeScore += homeScore
        this.state.value.homeGoalLog += `${this.state.value.timing}', `
      }
      else if (awayScore) {
        this.state.value.awayScore += awayScore
        this.state.value.awayGoalLog += `${this.state.value.timing}', `
      }

      let shotsProcess = 50
      const allShots = this.state.value.homeShots + this.state.value.awayShots
      if (allShots > 0)
        shotsProcess = this.state.value.homeShots / (allShots) * 100
      this.state.value.shotsProgress = this.buildProgressBar(shotsProcess)

      this.state.value.timing += 1

      if (this.state.value.timing >= fulltime) {
        clearInterval(intervalId)

        // 计算 xg 进度条暂时放这里
        let xgProcess = 50
        const allXG = this.state.value.homeXG + this.state.value.awayXG
        if (allXG > 0)
          xgProcess = this.state.value.homeXG / (allXG) * 100
        this.state.value.xgProgress = this.buildProgressBar(xgProcess)
      }
    }, delay)
  }

  reset() {
    this.state.value = {
      homeShots: 0,
      awayShots: 0,
      homeScore: 0,
      awayScore: 0,
      homeXG: 0,
      awayXG: 0,
      timing: 0,
      homeGoalLog: '',
      awayGoalLog: '',
      shotsProgress: '',
      xgProgress: '',
    }
  }
}
