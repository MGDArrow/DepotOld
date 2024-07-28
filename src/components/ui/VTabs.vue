<template>
  <div class="tabs">
    <div
      class="tabs__item"
      v-for="tab in tabs"
      :key="tab"
      @click="$emit('update:modelValue', tab)"
    >
      {{ tab }}
    </div>
    <div
      class="tabs__toggle"
      :style="{ width: toggleWidth, left: togglePosition }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  tabs: Array,
  modelValue: String,
});

const toggleWidth = computed(() => `calc(100% / ${props.tabs.length})`);
const togglePosition = computed(() => {
  const position = props.tabs.indexOf(props.modelValue);
  return `calc((100% / ${props.tabs.length}) * ${position})`;
});
</script>

<style lang="scss">
.tabs {
  width: 100%;
  height: inherit;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5em;
  &__item {
    flex-basis: 100%;
    z-index: 1;
  }
  &__toggle {
    position: absolute;
    height: 100%;
    width: 50%;
    background: $col-basic;
    transition: $t-base;
  }
}
</style>