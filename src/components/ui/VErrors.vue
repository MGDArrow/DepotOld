<template>
  <ul class="errors">
    <li v-for="error in errors" :key="error.id">{{ error }}</li>
  </ul>
</template>

<script setup>
const props = defineProps({
  errors: Array,
});
</script>

<style lang="scss">
ul[class="errors"] {
  padding-left: 30px;
  list-style: circle;
  color: $col-red;
  font-weight: 300;
  font-size: 0.9em;
}
</style>