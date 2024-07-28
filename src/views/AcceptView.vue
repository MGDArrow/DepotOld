<template>
  <form class="accept" @submit.prevent="postBox()">
    <router-link :to="{ name: 'Home' }">
      <h1>Добавить позицию</h1>
    </router-link>

    <VInput v-model.trim="organization">Откуда</VInput>
    <VList
      :list="organizations"
      :tab="organization"
      @tabList="(e) => (organization = e[0])"
    />
    <VInput v-model.trim="name">Название</VInput>
    <VInput v-model.trim="category">Категория</VInput>
    <VList
      :list="categories"
      :tab="category"
      @tabList="(e) => (category = e[0])"
    />
    <VInput v-model.trim.number="count" :type="'number'">Количество</VInput>
    <VCheck v-model.trim="isdateLife">Имеет срок годности</VCheck>
    <VInput v-if="isdateLife" v-model="dateLife" :type="'date'">
      Срок годности
    </VInput>
    <VButton :disabled="disabled" :error="error">Добавить</VButton>
  </form>

  <GModal :open="dateLife.length !== 10" @close="isdateLife = false">
    <VDate @getDate="(e) => (dateLife = e)" />
  </GModal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import VInput from "@/components/ui/VInput.vue";
import VButton from "@/components/ui/VButton.vue";
import VCheck from "@/components/ui/VCheck.vue";
import VList from "@/components/VList.vue";
import VDate from "@/components/VDate.vue";
import { useCategoriesStore } from "@/stores/categories";
import { useOrganizationsStore } from "@/stores/organizations";
import { useBoxesStore } from "@/stores/boxes";
import { useHistoryStore } from "@/stores/history";

const organizations = computed(() => useOrganizationsStore().organizations);
const organization = ref("");
const categories = computed(() => useCategoriesStore().categories);
const category = ref("");
const categoryId = ref("");
const name = ref("");
const count = ref("");

const isdateLife = ref(false);
const dateLife = ref("2000-01-01");

const disabled = ref(false);
const error = ref(false);

watch(isdateLife, (newVal) => {
  if (newVal) {
    dateLife.value = "20000-01-01";
  } else {
    dateLife.value = "2000-01-01";
  }
});

async function postBox() {
  disabled.value = true;
  error.value = false;
  try {
    await newOrganization();
    await newCategory();
    let addcount = await isBox();
    if (addcount) {
      let payload = {
        category: categoryId.value,
        name: name.value,
        count: count.value,
        dateLife: dateLife.value,
      };
      await useBoxesStore().postBox(payload);
      await useHistoryStore().postHistoryAccept(payload, organization.value);
    }
    category.value = "";
    name.value = "";
    count.value = "";
    isdateLife.value = false;
    dateLife.value = "2000-01-01";
  } catch (err) {
    error.value = true;
  }
  disabled.value = false;
}
async function newOrganization() {
  let isNew = organizations.value.find((el) => {
    return el.name.toLowerCase() === organization.value.toLowerCase();
  });
  if (!isNew) {
    try {
      await useOrganizationsStore().postOrganization(organization.value);
      newOrganization();
    } catch (err) {
      throw "Ошибка добавления организации";
    }
  }
}
async function newCategory() {
  let isNew = categories.value.find((el) => {
    return el.name.toLowerCase() === category.value.toLowerCase();
  });
  if (!!isNew) {
    categoryId.value = isNew.id;
  } else {
    try {
      await useCategoriesStore().postCategory(category.value);
      newCategory();
    } catch (err) {
      throw "Ошибка добавления категории";
    }
  }
}
async function isBox() {
  let BOXES = await useBoxesStore().getBoxFilt(name.value, dateLife.value);

  if (BOXES[0]) {
    console.log(BOXES[0]);
    await useBoxesStore().editBoxCount(
      BOXES[0],
      +BOXES[0].count + +count.value
    );
    await useHistoryStore().postHistoryAccept(BOXES[0], organization.value);
    return false;
  }
  return true;
}
</script>