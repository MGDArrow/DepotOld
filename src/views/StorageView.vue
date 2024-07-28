<template>
  <div class="storage">
    <router-link :to="{ name: 'Home' }">
      <h1>Склад</h1>
    </router-link>
    <div class="height__body">
      <div
        class="storage_groupe"
        v-for="(groupe, key) in boxesGroupe"
        :key="groupe.id"
      >
        <div class="storage__category">{{ key }}</div>
        <GSwiper
          v-for="box in groupe"
          :key="box.id"
          @right="deleteBox(box.id)"
          @left="getEditBox(box)"
        >
          <div class="storage__item">
            <div class="storage__item--name">{{ box.name }}</div>
            <div class="storage__item--count">{{ box.count }} ед.</div>
            <div
              class="storage__item--dateLife"
              :class="{ expired: isExpired(box.dateLife) }"
            >
              {{ getNormalDate(box.dateLife) }}
            </div>
          </div>
        </GSwiper>
      </div>
    </div>

    <GModal :open="openModal" @close="openModal = false">
      <form @submit.prevent="editBox()">
        <h2>Изменить позицию</h2>
        <VInput v-model.trim="name">Название</VInput>
        <VInput v-model.trim.number="count" :type="'number'">Количество</VInput>
        <VCheck v-model.trim="isdateLife">Имеет срок годности</VCheck>
        <VInput v-if="isdateLife" v-model="dateLife" :type="'date'">
          Срок годности
        </VInput>
        <VButton :disabled="disabled" :error="error">Изменить</VButton>
      </form>
    </GModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useBoxesStore } from "@/stores/boxes";
import { useHistoryStore } from "@/stores/history";
import { supabase } from "@/lib/supabaseClient.js";
import VInput from "@/components/ui/VInput.vue";
import VCheck from "@/components/ui/VCheck.vue";
import VButton from "@/components/ui/VButton.vue";

const openModal = ref(false);

const boxId = ref("");
const name = ref("");
const count = ref("");
const isdateLife = ref(false);
const dateLife = ref("2000-01-01");

const disabled = ref(false);
const error = ref(false);

async function deleteBox(id) {
  let { data: BOXES, error } = await supabase
    .from("BOXES")
    .select("*")
    .eq("id", id);
  await useHistoryStore().postHistoryChange(id, {
    name: BOXES[0].name,
    count: 0,
    dateLife: BOXES[0].dateLife,
  });
  await useBoxesStore().deleteBox(id);
}

async function editBox() {
  disabled.value = true;
  error.value = false;
  try {
    let payload = {
      name: name.value,
      count: count.value,
      dateLife: dateLife.value,
    };
    await useHistoryStore().postHistoryChange(boxId.value, payload);
    await useBoxesStore().editBox(boxId.value, payload);
    openModal.value = false;
  } catch (err) {
    error.value = true;
  }
  disabled.value = false;
}

watch(isdateLife, (newVal) => {
  if (!newVal) {
    dateLife.value = "2000-01-01";
  }
});

function getEditBox(box) {
  openModal.value = true;
  boxId.value = box.id;

  name.value = box.name;
  count.value = box.count;
  isdateLife.value = box.dateLife === "2000-01-01" ? false : true;
  dateLife.value = box.dateLife;
}

function isExpired(date) {
  if (
    date !== "2000-01-01" &&
    +new Date(date) - Date.now() <= 1000 * 60 * 60 * 24 * 60
  ) {
    return true;
  }
}

function getNormalDate(date) {
  return date !== "2000-01-01" ? date.split("-").reverse().join("-") : "∞";
}
const boxesGroupe = computed(() => {
  return useBoxesStore().boxes.reduce((groupe, box) => {
    const category = box.category.name;
    groupe[category] = groupe[category] ?? [];
    groupe[category].push(box);
    return groupe;
  }, {});
});
</script>

<style lang="scss">
.storage {
  &__category {
    font-size: 1.5em;
    color: $col-basic;
    background: $col-bg-light;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 5px;
  }
  &__item {
    display: flex;
    flex-wrap: wrap;
    background: $col-bg;
    font-size: 1.2em;
    padding: 5px 10px;
    margin-bottom: 5px;
    &--name {
      width: 100%;
      font-weight: 500;
    }
    &--count,
    &--dateLife {
      width: 50%;
      font-weight: 300;
    }
  }
}
.expired {
  color: $col-red;
}
</style>