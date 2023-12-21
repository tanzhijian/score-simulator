import type { MatchTypes, MatchesTypes } from '~/types'
import { Frame, FrameTeam, Result, ResultTeam } from '~/models'

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

  attack(): Frame {
    const frame = new Frame(new FrameTeam(), new FrameTeam())

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
        frame.home.shot = true
        frame.home.xg = this.generateXG(homeXGPerShot)
        if (Math.random() < homeXGPerShot)
          frame.home.score = true
      }
      else {
        frame.away.shot = true
        frame.away.xg = this.generateXG(awayXGPerShot)
        if (Math.random() < awayXGPerShot)
          frame.away.score = true
      }
    }

    return frame
  }

  play(fulltime: number = 90, delay: number = 100): void {
    this.result.value.reset()
    this.result.value.played = true

    const intervalId = setInterval(() => {
      const frame = this.attack()
      this.result.value.home.shots += +frame.home.shot
      this.result.value.home.xg += frame.home.xg
      this.result.value.home.score += +frame.home.score
      this.result.value.away.shots += +frame.away.shot
      this.result.value.away.xg += frame.away.xg
      this.result.value.away.score += +frame.away.score

      if (frame.home.score)
        this.result.value.home.goalMinutes.push(this.result.value.timing)
      else if (frame.away.score)
        this.result.value.away.goalMinutes.push(this.result.value.timing)

      this.result.value.timing += 1

      if (this.result.value.timing >= fulltime)
        clearInterval(intervalId)
    }, delay)
  }
}
