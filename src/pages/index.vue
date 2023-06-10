<script setup lang="ts">
const FULLTIME = 90
const HOME_XG_PER_SHOT = 0.145431
const AWAY_XG_PER_SHOT = 0.119904
const HOME_SHOT_PERCENTAGE = 0.53552
const SHOT_PROB_PER_MINUTE = 0.32869

const state = ref({
  homeScore: 0,
  awayScore: 0,
  timing: 0,
  homeGoalLog: '',
  awayGoalLog: '',
})

function whoScored() {
  if (Math.random() < SHOT_PROB_PER_MINUTE) {
    if (Math.random() < HOME_SHOT_PERCENTAGE) {
      if (Math.random() < HOME_XG_PER_SHOT) {
        state.value.homeScore += 1
        state.value.homeGoalLog += `${state.value.timing}', `
      }
    }
    else {
      if (Math.random() < AWAY_XG_PER_SHOT) {
        state.value.awayScore += 1
        state.value.awayGoalLog += `${state.value.timing}', `
      }
    }
  }
}

function playGame() {
  reset()
  const intervalId = setInterval(() => {
    whoScored()
    state.value.timing += 1

    if (state.value.timing >= FULLTIME)
      clearInterval(intervalId)
  }, 100)
}

function reset() {
  state.value.homeScore = 0
  state.value.awayScore = 0
  state.value.timing = 0
  state.value.homeGoalLog = ''
  state.value.awayGoalLog = ''
}
</script>

<template>
  <div ml-2 mr-2 rd-4 bg-white pb-5 pt-5 dark:bg-hex-121212>
    <!-- 比赛 -->
    <div flex items-center justify-center pb-5>
      <div pr-2>
        <img w-8 src="https://crests.football-data.org/CL.png">
      </div>
      <div text="5">
        Champions League Final
      </div>
    </div>
    <!-- 队伍信息和比分 -->
    <div flex>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 src="https://crests.football-data.org/65.png">
        </div>
        <div>Man City</div>
        <div
          text="left gray"
          flex="~ gap1"
          justify-center
          p5
        >
          <div
            v-if="state.homeGoalLog.length !== 0"
            i-carbon-circle-packing
            mt="0.5"
            style="min-width: 1.25rem;"
          />
          {{ state.homeGoalLog }}
        </div>
      </div>
      <div flex-1>
        <div text="10">
          {{ state.homeScore }} - {{ state.awayScore }}
        </div>
        <div text="5 gray">
          {{ state.timing !== 90 ? `${state.timing}:00` : 'Full-Time' }}
        </div>
        <!-- 按钮 -->
        <div flex="~ gap1" justify-center pt-5>
          <button
            v-if="state.timing > 0 && state.timing < 90"
            text="10"
            i-carbon-friendship
            bg-white
            dark:bg-hex-121212
          />
          <button
            v-else
            text="10"
            i-carbon-play-filled
            bg-green-600
            @click="playGame()"
          />
        </div>
      </div>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 src="https://crests.football-data.org/108.png">
        </div>
        <div>Inter</div>
        <div
          text="left gray"
          flex="~ gap1"
          justify-center
          p5
        >
          <div
            v-if="state.awayGoalLog.length !== 0"
            i-carbon-circle-packing
            mt="0.5"
            style="min-width: 1.25rem;"
          />
          {{ state.awayGoalLog }}
        </div>
      </div>
    </div>
    <!-- 模拟内容 -->
  </div>
</template>
