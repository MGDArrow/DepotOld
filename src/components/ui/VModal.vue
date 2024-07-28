<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="js-modal" v-if="open">
        <div class="js-modal__body" ref="modalRef">
          <div class="js-modal__close" @click="emit('close')">
            <GIcon name="close" />
          </div>
          <div class="js-modal__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["open"]);
const emit = defineEmits(["close"]);

const modalRef = ref(null);
onClickOutside(modalRef, () => emit("close"));
</script>

<style lang="scss">
.js-modal {
  &::before {
    position: fixed;
    content: "";
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background: $col-bg-dark;
    opacity: 0.7;
  }
  &__body {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85vw;
    height: max-content;
    padding: 5px;
    background: $col-bg;
    border: 2px solid $col-basic;
  }
  &__close {
    position: absolute;
    top: -10px;
    right: -10px;
    background: $col-basic;
    width: 20px;
    height: 20px;
    line-height: 22px;
    text-align: center;
  }
}
</style>