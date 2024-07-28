<template>
  <button :disabled="disabled" :class="{ 'js-error': error }">
    <span class="loader" v-if="disabled"></span>
    <span v-else-if="error">Ошибка</span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
button {
  width: 100%;
  height: 40px;
  margin: 10px 0 0;
  font-size: 1.5em;
  font-weight: 400;
  background: $col-basic;
  color: $col-text;
  outline: transparent;
  border: transparent;
  text-transform: uppercase;
  &:disabled {
    background: $col-bg-light;
  }
  &.js-error {
    background: $col-red;
  }
}
</style>