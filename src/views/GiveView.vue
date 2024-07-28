<template>
  <form class="give" @submit.prevent="giveBox()">
    <router-link :to="{ name: 'Home' }">
      <h1>Отдать позицию</h1>
    </router-link>

    <VInput v-model.trim="give">Куда</VInput>
    <VList :list="givers" :tab="give" @tabList="(e) => (give = e[0])" />

    <VInput v-model.trim="box">Название</VInput>
    <VList :list="boxes" :tab="box" @tabList="(e) => getBoxId(e)" />

    <div class="give__info" v-if="boxInfo">
      <div>
        Срок годности: <span>{{ getNormalDate(boxInfo.dateLife) }}</span>
      </div>
      <div>
        Количетсво: <span>{{ boxInfo.count }}</span>
      </div>
    </div>

    <VInput v-model.trim.number="count" :type="'number'">Количество</VInput>
    <VButton :disabled="disabled" :error="error">Отдать</VButton>
  </form>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import VInput from "@/components/ui/VInput.vue";
import VButton from "@/components/ui/VButton.vue";
import VList from "@/components/VList.vue";
import { useBoxesStore } from "@/stores/boxes";
import { useGiversStore } from "@/stores/givers";
import { useHistoryStore } from "@/stores/history";

const givers = computed(() => useGiversStore().givers);
const give = ref("");
const boxes = computed(() => useBoxesStore().boxes);
const box = ref("");
const boxId = ref("");
const boxInfo = computed(() => {
  return boxes.value.find((el) => {
    return el.id === boxId.value;
  });
});
const count = ref("");
const disabled = ref(false);
const error = ref(false);

watch(count, (newValue) => {
  if (newValue >= +boxInfo.value?.count) {
    count.value = +boxInfo.value.count;
  }
});

function getBoxId(e) {
  box.value = e[0];
  boxId.value = e[1];
}

async function giveBox() {
  disabled.value = true;
  error.value = false;
  try {
    let isNew = boxes.value.find((el) => {
      return el.name.toLowerCase() === box.value.toLowerCase();
    });
    if (!isNew) {
      return;
    }
    await newGiver();

    await useBoxesStore().editBoxCount(
      boxInfo.value,
      +boxInfo.value.count - +count.value
    );
    await useHistoryStore().postHistoryGive(
      boxInfo.value,
      +count.value,
      give.value
    );
    give.value = "";
    box.value = "";
    count.value = "";
  } catch (err) {
    error.value = true;
  }
  disabled.value = false;
}
async function newGiver() {
  let isNew = givers.value.find((el) => {
    return el.name.toLowerCase() === give.value.toLowerCase();
  });
  if (!isNew) {
    try {
      await useGiversStore().postGiver(give.value);
      newGiver();
    } catch (err) {
      throw "Ошибка добавления получателя";
    }
  }
}

function getNormalDate(date) {
  if (date === "2000-01-01") {
    return "∞";
  }
  return date.split("-").reverse().join("-");
}
</script>

<style lang="scss">
.give {
  &__info {
    padding: 5px 10px 0px;
    font-size: 1.2em;
    & span {
      color: $col-basic;
    }
  }
}
</style>
