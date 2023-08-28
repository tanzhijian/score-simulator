<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { Match } from '~/types'
import { Game } from '~/composables/logic'

const props = defineProps<{ match: Match }>()

const formatter = 'YYYY-MM-DD HH:mm'
const formattedDatetime = useDateFormat(props.match.start_time, formatter)

const FULLTIME = 90
const DELAY = 100

const game = new Game(
  props.match.home_team.shots,
  props.match.home_team.xg,
  props.match.home_team.matches_played,
  props.match.away_team.shots,
  props.match.away_team.xg,
  props.match.away_team.matches_played,
)
</script>

<template>
  <div mb-5 ml-2 mr-2 rd-4 bg-white pb-5 pt-5 dark:bg-hex-2e2a2e>
    <!-- 比赛 -->
    <div flex items-center justify-center pb-5>
      <div pr-2>
        <img w-8 :src="match.competition.logo">
      </div>
      <div>
        {{ match.competition.name }}
      </div>
    </div>
    <!-- 队伍信息和比分 -->
    <div flex>
      <!-- 主队信息 -->
      <div flex-1>
        <div flex items-center justify-center>
          <img h-12 :src="match.home_team.logo">
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
            mt="0.3"
            style="min-width: 1.25rem;"
          />
          {{ game.state.value.homeGoalLog }}
        </div>
      </div>
      <!-- 比分和状态 -->
      <div flex-1>
        <div v-if="!game.state.value.played && !match.finished" text-8>
          -
        </div>
        <div v-else text-8>
          {{
            match.finished ? match.home_team.score : game.state.value.homeScore
          }}
          -
          {{
            match.finished ? match.away_team.score : game.state.value.awayScore
          }}
        </div>
        <div>
          <div v-if="!game.state.value.played" text="gray">
            {{ formattedDatetime }}
          </div>
          <div v-else-if="game.state.value.timing >= 90">
            <div>
              {{ game.state.value.homeXG.toFixed(2) }}
              - xG -
              {{ game.state.value.awayXG.toFixed(2) }}
            </div>
            <span text="green-600" font-mono>
              {{ game.state.value.xgProgress }}
            </span>
          </div>
          <div v-else text="green-600 4">
            {{ `${game.state.value.timing}:00` }}
          </div>
        </div>
        <!-- 按钮 -->
        <div flex="~ gap1" justify-center pt-5 text-8>
          <div v-if="match.finished" text="gray 4">
            Full time
          </div>
          <div
            v-else-if="
              game.state.value.timing > 0 && game.state.value.timing < 90
            "
            text="3"
          >
            <div>
              - Shots -
            </div>
            <div>
              {{ game.state.value.homeShots }}
              <span text="green-600" font-mono>
                {{ game.state.value.shotsProgress }}
              </span>
              {{ game.state.value.awayShots }}
            </div>
          </div>
          <button
            v-else
            i-carbon-play-filled
            bg-green-600
            @click="game.play(FULLTIME, DELAY)"
          />
        </div>
      </div>
      <!-- 客队信息 -->
      <div flex-1>
        <div flex items-center justify-center>
          <img h-12 :src="match.away_team.logo">
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
            mt="0.3"
            style="min-width: 1.25rem;"
          />
          {{ game.state.value.awayGoalLog }}
        </div>
      </div>
    </div>
    <!-- 模拟内容 -->
  </div>
</template>
