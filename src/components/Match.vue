<script setup lang="ts">
import type { Match } from '~/types'
import { Game } from '~/composables/logic'

const props = defineProps<{ match: Match }>()

const FULLTIME = 90
const DELAY = 100

const game = new Game(
  props.match.home_team.shots,
  props.match.home_team.xg,
  props.match.away_team.shots,
  props.match.away_team.xg,
)
</script>

<template>
  <div mb-5 ml-2 mr-2 rd-4 bg-white pb-5 pt-5 dark:bg-hex-121212>
    <!-- 比赛 -->
    <div flex items-center justify-center pb-5>
      <div pr-2>
        <img w-8 :src="match.competition.emblem">
      </div>
      <div text="5">
        {{ match.competition.name }}
      </div>
    </div>
    <!-- 队伍信息和比分 -->
    <div flex>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 :src="match.home_team.crest">
        </div>
        <div>{{ match.home_team.name }}</div>
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
          <span v-if="!game.state.value.played" text-3>
            {{ match.start_time }}
          </span>
          <span v-else-if="game.state.value.timing >= 90">
            Full-Time
          </span>
          <span v-else>
            {{ `${game.state.value.timing}:00` }}
          </span>
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
          <img w-12 :src="match.away_team.crest">
        </div>
        <div>{{ match.away_team.name }}</div>
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
