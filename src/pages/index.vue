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
})
const timing = $computed(() => state.value.timing)

function whoScored() {
  if (Math.random() < SHOT_PROB_PER_MINUTE) {
    if (Math.random() < HOME_SHOT_PERCENTAGE) {
      if (Math.random() < HOME_XG_PER_SHOT)
        state.value.homeScore += 1
    }
    else {
      if (Math.random() < AWAY_XG_PER_SHOT)
        state.value.awayScore += 1
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
      </div>
      <div flex-1>
        <div text="10">
          {{ state.homeScore }} - {{ state.awayScore }}
        </div>
        <div text="5 gray">
          {{ timing !== 90 ? `${timing}:00` : 'Full-Time' }}
        </div>
      </div>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 src="https://crests.football-data.org/108.png">
        </div>
        <div>Inter</div>
      </div>
    </div>
    <!-- 按钮 -->
    <div flex="~ gap1" justify-center pt-5>
      <button
        v-if="timing > 0 && timing < 90"
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
    <!-- 模拟内容 -->
    <!-- <div p5 text="left gray" flex="~ gap1">
      <div i-carbon-circle-dash />
      <div i-carbon-circle-filled />
    </div> -->
  </div>
</template>
