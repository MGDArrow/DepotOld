<template>
  <div class="list" v-if="listTab[0]">
    <div
      class="list__item"
      v-for="item in listTab"
      :key="item.id"
      @click="$emit('tabList', [item?.name, item?.id])"
    >
      {{ item.name }}
      <span>{{ getNormalDate(item) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  tab: {
    type: String,
    default: "",
  },
});

const listTab = computed(() => {
  if (props.tab === "" || isTab.value) {
    return [];
  }
  return props.list.filter((el) => {
    return el.name.toLowerCase().includes(props.tab.toLowerCase());
  });
});

const isTab = computed(() => {
  return props.list.find((el) => {
    return el.name.toLowerCase() === props.tab.toLowerCase();
  });
});

function getNormalDate(item) {
  if (item?.dateLife) {
    let date = item.dateLife;
    if (date === "2000-01-01") {
      return "∞";
    }
    return date.split("-").reverse().join("-");
  }
}
</script>

<style lang="scss">
.list {
  width: 100%;
  background: $col-bg;
  max-height: calc(5dvh * 4);
  overflow: auto;
  &__item {
    font-size: 1.2em;
    height: 5dvh;
    padding: 5px;
    border-bottom: 1px solid $col-bg-light;
    & span {
      color: $col-basic;
      font-size: 0.7em;
      padding-left: 5px;
    }
  }
}
</style>