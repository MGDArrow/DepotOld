<template>
  <div class="history">
    <router-link :to="{ name: 'Home' }">
      <h1>История</h1>
    </router-link>

    <Suspense>
      <HistoryGroupe />
      <template #fallback>
        <div class="history__load">
          <span class="loader"></span>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import HistoryGroupe from "@/components/HistoryGroupe.vue";
</script>

<style lang="scss">
.history {
  &__load {
    width: 100%;
    height: calc(100dvh - (8dvh - 10px) - 25px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>