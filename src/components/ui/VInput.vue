<template>
  <div class="input">
    <label>
      <input
        :type="type"
        :class="{ notEmpty: !!modelValue || modelValue === 0 }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
      />
      <span><slot></slot></span>
    </label>
  </div>
</template>
  
<script setup>
const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: "text",
  },
});
</script>
  
<style lang="scss">
.input {
  & label {
    width: 100%;
    height: 80px;
    display: block;
    position: relative;
    font-size: 1.3em;
    & * {
      width: 100%;
      height: 40px;
      padding: 0 5px;
      position: absolute;
      top: 40px;
      transition: $t-fast;
    }
    span {
      color: $col-basic;
    }
    input {
      background: transparent;
      border: none;
      outline: none;
      color: $col-text;
      border-bottom: 2px solid $col-basic;
      transition: $t-fast;
      &:focus,
      &.notEmpty {
        border-bottom: 2px solid $col-basic;
        & + span {
          top: 0;
          color: $col-basic;
        }
      }
    }
  }
}
</style>