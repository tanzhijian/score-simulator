<script setup lang="ts">
import { matches } from '~/data/matches.json'
</script>

<template>
  <div mb-5 flex bg-white pb-5 pt-5 text-5 shadow="" dark:bg-hex-121212>
    <!-- 上下居中怎么调 -->
    <div flex-1 pt-1>
      <button i-carbon-chevron-left />
    </div>
    <div flex-1>
      <h2>
        <button>Today</button>
      </h2>
    </div>
    <div flex-1 pt-1>
      <button i-carbon-chevron-right />
    </div>
  </div>
  <Match
    v-for="match in matches"
    :key="match.id"
    :match="match"
  />
</template>
