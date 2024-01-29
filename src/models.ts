import type { Counter } from '~/types'

export class ResultTeam {
  constructor(
    public name: string,
    public shots: number = 0,
    public score: number = 0,
    public xg: number = 0,
    public goalMinutes: number[] = [],
  ) {}

  get goalLog(): string {
    return this.goalMinutes.map(minute => `${minute}'`).join(', ')
  }

  reset(): void {
    this.shots = 0
    this.score = 0
    this.xg = 0
    this.goalMinutes = []
  }
}

export class Result {
  constructor(
    public home: ResultTeam,
    public away: ResultTeam,
    public competition: string,
    public timing: number = 0,
    public played: boolean = false,
  ) {}

  add(result: Result): Result {
    const home = new ResultTeam(
      this.home.name,
      this.home.shots + result.home.shots,
      this.home.score + result.home.score,
      this.home.xg + result.home.xg,
      this.home.goalMinutes.concat(result.home.goalMinutes),
    )
    const away = new ResultTeam(
      this.away.name,
      this.away.shots + result.away.shots,
      this.away.score + result.away.score,
      this.away.xg + result.away.xg,
      this.away.goalMinutes.concat(result.away.goalMinutes),
    )
    return new Result(home, away, this.competition, this.timing, this.played)
  }

  topGoalPeriods(goalMinutes: number[], n: number): number[] {
    // 计算每个时段的进球次数
    const goalCounts: Counter = {}

    for (const minute of goalMinutes) {
      if (goalCounts[minute] === undefined)
        goalCounts[minute] = 1
      else
        goalCounts[minute]++
    }

    // 选择前 n 个进球次数最多的时段
    const topPeriods: number[] = Object.keys(goalCounts)
      .sort((a, b) => goalCounts[b] - goalCounts[a])
      .slice(0, n)
      .map(Number)
    return topPeriods.sort((a, b) => a - b)
  }

  divide(divisor: number): Result {
    const homeScore = ~~(this.home.score / divisor)
    const home = new ResultTeam(
      this.home.name,
      ~~(this.home.shots / divisor),
      homeScore,
      this.home.xg / divisor,
      this.topGoalPeriods(this.home.goalMinutes, homeScore),
    )
    const awayScore = ~~(this.away.score / divisor)
    const away = new ResultTeam(
      this.away.name,
      ~~(this.away.shots / divisor),
      awayScore,
      this.away.xg / divisor,
      this.topGoalPeriods(this.away.goalMinutes, awayScore),
    )

    return new Result(home, away, this.competition, this.timing, this.played)
  }

  buildProgressBar(progress: number): string {
    let bar = ''
    for (let i = 1; i <= 10; i++) bar += progress >= i * 10 ? '█' : '░'
    return bar
  }

  get shotsProgressBar(): string {
    const allShots = this.home.shots + this.away.shots
    let shotsProgress = 50
    if (allShots > 0)
      shotsProgress = (this.home.shots / allShots) * 100
    return this.buildProgressBar(shotsProgress)
  }

  get xgProgressBar(): string {
    const allXG = this.home.xg + this.away.xg
    let xgProgress = 50
    if (allXG > 0)
      xgProgress = (this.home.xg / allXG) * 100
    return this.buildProgressBar(xgProgress)
  }

  reset(): void {
    this.home.reset()
    this.away.reset()
    this.timing = 0
    this.played = false
  }
}

export class StepTeam {
  constructor(
    public shot: boolean = false,
    public score: boolean = false,
    public xg: number = 0,
  ) {}
}

export class Step {
  constructor(
    public home: StepTeam,
    public away: StepTeam,
  ) {}
}
