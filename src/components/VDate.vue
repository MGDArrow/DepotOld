<template>
  <div class="date">
    <div class="date__year" v-if="date.length === 0">
      <div
        class="date__year--point"
        v-for="year in years"
        :key="year"
        @click="date = `${year}-`"
      >
        {{ year }}
      </div>
    </div>
    <div class="date__month" v-else-if="date.length === 5">
      <div
        class="date__month--point"
        v-for="(month, i) in months"
        :key="month"
        @click="date = `${date}${addZero(i + 1)}-`"
      >
        {{ month }}
      </div>
    </div>
    <div class="date__day" v-else>
      <div
        class="date__day--point"
        v-for="day in days"
        :key="day"
        @click="date = `${date}${addZero(day)}`"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["getDate"]);

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июль",
  "Июнь",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const days = Array.from(Array(31 + 1).keys()).slice(1);
const date = ref("");

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

watch(date, (newVal) => {
  if (newVal.length === 10) {
    emit("getDate", date.value);
  }
});
</script>

<style lang="scss">
.date {
  width: 100%;
  height: 60dvh;
  &__year,
  &__month,
  &__day {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 1.5em;
    &--point {
      background: $col-bg;
      border: 2px solid $col-basic;
      width: calc(33% - 3px);
      height: calc(33% - 3px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__month--point {
    height: calc(25% - 4px);
  }
  &__day--point {
    width: calc(100% / 6 - 5px);
    height: calc(100% / 6 - 5px);
    &:last-child {
      width: calc(100% - 5px);
    }
  }
}
</style>