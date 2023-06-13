<script setup lang="ts">
import { Game } from '~/composables/logic'

// import { matches } from '~/data/matches.json'

const FULLTIME = 90
const DELAY = 100

const game = new Game()
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
            v-if="game.state.value.homeGoalLog.length !== 0"
            i-carbon-circle-packing
            mt="0.5"
            style="min-width: 1.25rem;"
          />
          {{ game.state.value.homeGoalLog }}
        </div>
      </div>
      <div flex-1>
        <div text="10">
          {{ game.state.value.homeScore }} - {{ game.state.value.awayScore }}
        </div>
        <div text="5 gray">
          {{ game.state.value.timing !== 90 ? `${game.state.value.timing}:00` : 'Full-Time' }}
        </div>
        <!-- 按钮 -->
        <div flex="~ gap1" justify-center pt-5>
          <button
            v-if="game.state.value.timing > 0 && game.state.value.timing < 90"
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
            @click="game.play(FULLTIME, DELAY)"
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
            v-if="game.state.value.awayGoalLog.length !== 0"
            i-carbon-circle-packing
            mt="0.5"
            style="min-width: 1.25rem;"
          />
          {{ game.state.value.awayGoalLog }}
        </div>
      </div>
    </div>
    <!-- 模拟内容 -->
  </div>
</template>
