<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { MatchTypes } from '~/types'
import { Game } from '~/api'

const props = defineProps<{ match: MatchTypes }>()

const formatter = 'YYYY-MM-DD HH:mm'
const formattedDatetime = useDateFormat(props.match.utc_time, formatter)

const FULLTIME = 90
const DELAY = 100

const game = new Game(props.match)
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
          <img h-12 :src="match.home.logo">
        </div>
        <div>{{ match.home.name }}</div>
        <div text="left gray" flex="~ gap1" justify-center p5>
          <div
            v-if="game.result.value.home.goalLog.length !== 0" i-carbon-circle-packing mt="0.3"
            style="min-width: 1.25rem;"
          />
          {{ game.result.value.home.goalLog }}
        </div>
      </div>
      <!-- 比分和状态 -->
      <div flex-1>
        <div v-if="!game.result.value.played && !match.finished" text-8>
          -
        </div>
        <div v-else text-8>
          {{
            match.finished ? match.home.score : game.result.value.home.score
          }}
          -
          {{
            match.finished ? match.away.score : game.result.value.away.score
          }}
        </div>
        <div>
          <div v-if="!game.result.value.played" text="gray">
            {{ formattedDatetime }}
          </div>
          <div v-else-if="game.result.value.timing >= 90">
            <div>
              {{ game.result.value.home.xg.toFixed(2) }}
              - xG -
              {{ game.result.value.away.xg.toFixed(2) }}
            </div>
            <span text="green-600" font-mono>
              {{ game.result.value.xgProgressBar }}
            </span>
          </div>
          <div v-else text="green-600 4">
            {{ `${game.result.value.timing}:00` }}
          </div>
        </div>
        <!-- 按钮 -->
        <div flex="~ gap1" justify-center pt-5 text-8>
          <div v-if="match.finished" text="gray 4">
            Full time
          </div>
          <div
            v-else-if="game.result.value.timing > 0 && game.result.value.timing < 90
            " text="3"
          >
            <div>
              - Shots -
            </div>
            <div>
              {{ game.result.value.home.shots }}
              <span text="green-600" font-mono>
                {{ game.result.value.shotsProgressBar }}
              </span>
              {{ game.result.value.away.shots }}
            </div>
          </div>
          <button v-else i-carbon-play-filled bg-green-600 @click="game.play(FULLTIME, DELAY)" />
        </div>
      </div>
      <!-- 客队信息 -->
      <div flex-1>
        <div flex items-center justify-center>
          <img h-12 :src="match.away.logo">
        </div>
        <div>{{ match.away.name }}</div>
        <div text="left gray" flex="~ gap1" justify-center p5>
          <div
            v-if="game.result.value.away.goalLog.length !== 0" i-carbon-circle-packing mt="0.3"
            style="min-width: 1.25rem;"
          />
          {{ game.result.value.away.goalLog }}
        </div>
      </div>
    </div>
    <!-- 模拟内容 -->
  </div>
</template>
