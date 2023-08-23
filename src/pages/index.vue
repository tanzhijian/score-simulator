<script setup lang="ts">
import { useDateFormat, useFetch, useNow } from '@vueuse/core'

const today = useDateFormat(useNow(), 'YYYY-MM-DD')
let selectedDate = today.value

const selectedMatches = ref()
const matchesData = ref()

function filterMatches(date: string) {
  for (const dayMatches of matchesData.value.data) {
    if (dayMatches.date === date) {
      selectedDate = dayMatches.date
      dayMatches.data.sort((a: any, b: any) => {
        const aDate = new Date(a.start_time)
        const bDate = new Date(b.start_time)
        if (aDate < bDate)
          return -1
        if (aDate > bDate)
          return 1
        return 0
      })
      selectedMatches.value = dayMatches.data
    }
  }
}

async function getMatchesData() {
  const url = 'https://raw.githubusercontent.com/tanzhijian/score-simulator-data/main/matches.json'
  const { data } = await useFetch(url).get().json()
  matchesData.value = data.value
  filterMatches(selectedDate)
}

selectedMatches.value = []
matchesData.value = {}
getMatchesData()
</script>

<template>
  <div mb-5 flex bg-white shadow="" dark:bg-hex-2e2a2e>
    <div v-for="dayMatches in matchesData.data" :key="dayMatches.date" flex-1>
      <button
        v-if="dayMatches.date === selectedDate"
        pb-5
        pt-5
        style="border-bottom: 2px solid"
        @click="filterMatches(dayMatches.date)"
      >
        {{ dayMatches.date }}
      </button>
      <button v-else pb-5 pt-5 text-gray @click="filterMatches(dayMatches.date)">
        {{ dayMatches.date }}
      </button>
    </div>
  </div>
  <NoMatch v-if="selectedMatches.length < 1" />
  <Match v-for="match in selectedMatches" :key="match.id" :match="match" />
</template>
