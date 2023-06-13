<script setup lang="ts">
import { matches } from '~/data/matches.json'
</script>

<template>
  <Match
    v-for="match in matches"
    :key="match.id"
    :match="match"
  />
</template>
