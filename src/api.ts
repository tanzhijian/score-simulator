import type { MatchTypes, MatchesTypes } from '~/types'
import { Result, ResultTeam, Step, StepTeam } from '~/models'

export function selectMatches(
  date: string,
  matches: MatchesTypes,
): MatchTypes[] {
  const selected = matches[date]
  selected.sort((aMatch: MatchTypes, bMatch: MatchTypes) => {
    const aDate = new Date(aMatch.utc_time)
    const bDate = new Date(bMatch.utc_time)
    if (aDate < bDate)
      return -1
    if (aDate > bDate)
      return 1
    return 0
  })
  return selected
}

export class Game {
  constructor(public match: MatchTypes) {}

  result = ref(new Result(
    new ResultTeam(this.match.home.name),
    new ResultTeam(this.match.away.name),
    this.match.competition.name,
  ))

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

  attack(): Step {
    const step = new Step(new StepTeam(), new StepTeam())

    const homeXGPerShot = this.match.home.xg / this.match.home.shots
    const awayXGPerShot = this.match.away.xg / this.match.away.shots
    const homeShotPercentage
      = this.match.home.shots / (this.match.home.shots + this.match.away.shots)
    const shotProbPerMinute
      = (this.match.home.shots + this.match.away.shots)
      / ((this.match.home.played + this.match.away.played) / 2)
      / 90

    if (Math.random() < shotProbPerMinute) {
      if (Math.random() < homeShotPercentage) {
        step.home.shot = true
        step.home.xg = this.generateXG(homeXGPerShot)
        if (Math.random() < homeXGPerShot)
          step.home.score = true
      }
      else {
        step.away.shot = true
        step.away.xg = this.generateXG(awayXGPerShot)
        if (Math.random() < awayXGPerShot)
          step.away.score = true
      }
    }

    return step
  }

  play(fulltime: number = 90, delay: number = 100): void {
    this.result.value.reset()
    this.result.value.played = true

    const intervalId = setInterval(() => {
      const step = this.attack()
      this.result.value.home.shots += +step.home.shot
      this.result.value.home.xg += step.home.xg
      this.result.value.home.score += +step.home.score
      this.result.value.away.shots += +step.away.shot
      this.result.value.away.xg += step.away.xg
      this.result.value.away.score += +step.away.score

      if (step.home.score)
        this.result.value.home.goalMinutes.push(this.result.value.timing)
      else if (step.away.score)
        this.result.value.away.goalMinutes.push(this.result.value.timing)

      this.result.value.timing += 1

      if (this.result.value.timing >= fulltime)
        clearInterval(intervalId)
    }, delay)
  }
}
