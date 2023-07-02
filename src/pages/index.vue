<script setup lang="ts">
import matchesData from '~/data/matches.json'

let selectedDate = matchesData[1].date
const selectedMatches = ref()

function filterMatches(date: string) {
  for (const dayMatches of matchesData) {
    if (dayMatches.date === date) {
      selectedDate = dayMatches.date
      selectedMatches.value = dayMatches.matches
    }
  }
}

filterMatches(selectedDate)
</script>

<template>
  <div mb-5 flex bg-white shadow="" dark:bg-hex-2e2a2e>
    <div v-for="dayMatches in matchesData" :key="dayMatches.date" flex-1>
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
  <Match v-for="match in selectedMatches" :key="match.id" :match="match" />
</template>
