<template>
  <div class="check">
    <label>
      <input
        type="checkbox"
        :checked="props.modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <div class="check__checked"></div>
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.check {
  width: 100%;
  margin: 5px 0;
  font-size: 1.3em;
  & input {
    display: none;
  }
  & input:checked + .check__checked {
    background: $col-basic;
  }
  &__checked {
    width: 0.8em;
    height: 0.8em;
    border: 2px solid $col-basic;
    display: inline-block;
    margin-right: 5px;
    transition: $t-fast;
  }
}
</style>