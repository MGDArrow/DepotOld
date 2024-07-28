<template>
  <div
    class="js-swiper"
    :style="{ 'max-height': swiperHeight, transition: swipeTransition }"
  >
    <div
      class="js-swiper__left"
      :style="{
        background: colorL,
        width: widthL,
        height: contentHeight,
        opacity: swipeOpacity,
        transition: swipeTransition,
      }"
    >
      <GIcon :name="iconL" />
    </div>

    <div
      class="js-swiper__right"
      :style="{
        background: colorR,
        width: widthR,
        height: contentHeight,
        opacity: swipeOpacity,
        transition: swipeTransition,
      }"
    >
      <GIcon :name="iconR" />
    </div>
    <div
      class="js-swiper__content"
      ref="content"
      :style="{ left: `${swipeLength}px`, transition: swipeTransition }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useResizeObserver, useSwipe } from "@vueuse/core";

const props = defineProps({
  //* Directions: 'all' || 'onlyLeft' || 'onlyRight'
  directions: {
    type: String,
    default: "all",
  },
  //* Icons name in selection.json (left[0] & right[1])
  icons: {
    type: [Array, String],
    default: ["delete", "edit"],
  },
  //* Color background in :root css name (left[0] & right[1])
  collors: {
    type: [Array, String],
    default: ["red", "basic"],
  },
  //* Result after swipe in directions (left[0] & right[1]): 'delete', 'none' !REVERSE!;
  results: {
    type: [Array, String],
    default: ["none", "delete"],
  },
});
const emit = defineEmits(["left", "right"]);
const iconL = typeof props.icons === "object" ? props.icons[0] : props.icons;
const iconR = typeof props.icons === "object" ? props.icons[1] : props.icons;

const colorL =
  typeof props.collors === "object"
    ? `var(--c-${props.collors[0]})`
    : `var(--c-${props.collors})`;
const colorR =
  typeof props.collors === "object"
    ? `var(--c-${props.collors[1]})`
    : `var(--c-${props.collors})`;

const resultL =
  typeof props.results === "object" ? props.results[0] : props.results;
const resultR =
  typeof props.results === "object" ? props.results[1] : props.results;

const content = ref(null);
const contentHeight = ref(0);
const contentWidth = ref(0);
const swiperHeight = ref("100dvh");

const swipeLength = ref(0);
const swipeOpacity = ref(0.7);
const swipeDirection = ref(null);
const swipeTransition = ref("none");

const widthL = computed(() =>
  swipeDirection.value === "right" ? `${Math.abs(swipeLength.value)}px` : "0px"
);
const widthR = computed(() =>
  swipeDirection.value === "left" ? `${Math.abs(swipeLength.value)}px` : "0px"
);

useResizeObserver(content, (entries) => {
  const { height, width } = entries[0].contentRect;
  contentHeight.value = `${height}px`;
  contentWidth.value = width;
});

const { lengthX } = useSwipe(content, {
  passive: true,
  threshold: 0,
  onSwipeStart() {
    swipeTransition.value = "none";
  },
  onSwipe() {
    swipeDirection.value = lengthX.value >= 0 ? "left" : "right";
    swipeOpacity.value =
      Math.abs(swipeLength.value) / contentWidth.value >= 0.5 ? 1 : 0.8;
    if (
      props.directions === "all" ||
      (props.directions === "onlyLeft" && swipeDirection.value === "left") ||
      (props.directions === "onlyRight" && swipeDirection.value === "right")
    ) {
      swipeLength.value = -lengthX.value;
    }
  },
  onSwipeEnd() {
    if (Math.abs(swipeLength.value) / contentWidth.value <= 0.5) {
      animaionNone();
      return;
    }
    if (swipeDirection.value === "left") {
      emit("left");
      resultL === "none" ? animaionNone() : animaionDelete();
    }
    if (swipeDirection.value === "right") {
      emit("right");
      resultR === "none" ? animaionNone() : animaionDelete();
    }
  },
});

function animaionNone() {
  swipeTransition.value = "var(--t-fast)";
  swipeLength.value = 0;
}
function animaionDelete() {
  swipeTransition.value = "var(--t-base)";
  swipeLength.value =
    swipeDirection.value === "right" ? contentWidth.value : -contentWidth.value;
  swiperHeight.value = "0px";
}
</script>

<style lang="scss">
.js-swiper {
  position: relative;
  width: 100%;
  overflow: hidden;
  &__left,
  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    position: absolute;
    overflow: hidden;
  }
  &__right {
    right: 0;
  }
  &__content {
    position: relative;
  }
}
</style>