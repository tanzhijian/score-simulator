<script setup lang="ts">
import matches from '~/data/matches.json'

const dateRange = ['Yesterday', 'Today', 'Tomorrow', '2023-05-30']
</script>

<template>
  <div mb-5 flex bg-white shadow="" dark:bg-hex-2e2a2e>
    <div v-for="date in dateRange" :key="date" flex-1>
      <button
        v-if="date === 'Today'"
        pb-5
        pt-5
        style="border-bottom: 2px solid"
      >
        {{ date }}
      </button>
      <button v-else pb-5 pt-5 text-gray>
        {{ date }}
      </button>
    </div>
  </div>
  <Match v-for="match in matches" :key="match.id" :match="match" />
</template>
