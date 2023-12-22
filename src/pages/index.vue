<script setup lang="ts">
import { useDateFormat, useFetch, useNow } from '@vueuse/core'
import { selectMatches } from '~/api'
import type { MatchTypes, MatchesTypes } from '~/types'

const MATCHES_URL = 'https://raw.githubusercontent.com/tanzhijian/score-simulator-data/release/matches.json'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')
let selectedDate = today.value

const selectedMatches = ref([]) as Ref<MatchTypes[]>
const matchesData = ref({}) as Ref<MatchesTypes>

async function init() {
  const { data } = await useFetch(MATCHES_URL).get().json()
  matchesData.value = data.value
  filterMatches(selectedDate)
}

function filterMatches(date: string) {
  selectedDate = date
  selectedMatches.value = selectMatches(date, matchesData.value)
}

onMounted(init)
</script>

<template>
  <div mb-5 flex bg-white shadow="" dark:bg-hex-2e2a2e>
    <div v-for="date in Object.keys(matchesData)" :key="date" flex-1>
      <button
        v-if="date === selectedDate"
        pb-5
        pt-5
        style="border-bottom: 2px solid"
        @click="filterMatches(date)"
      >
        {{ date }}
      </button>
      <button v-else pb-5 pt-5 text-gray @click="filterMatches(date)">
        {{ date }}
      </button>
    </div>
  </div>
  <NoMatch v-if="selectedMatches.length < 1" />
  <Match v-for="match in selectedMatches" :key="match.name" :match="match" />
</template>
