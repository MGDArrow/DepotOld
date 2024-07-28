<template>
  <div class="basic">
    <LayoutDesktop v-if="isDesktop"></LayoutDesktop>
    <router-view v-slot="{ Component }" v-else>
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import { useOrganizationsStore } from "@/stores/organizations";
import { useGiversStore } from "@/stores/givers";
import { useBoxesStore } from "@/stores/boxes";

import LayoutDesktop from "./LayoutDesktop.vue";
const isDesktop = ref(document.documentElement.clientWidth > 900);

onMounted(() => {
  useCategoriesStore().getCategories();
  useOrganizationsStore().getOrganizations();
  useGiversStore().getGivers();
  useBoxesStore().getBoxes();
  window.addEventListener("resize", () => {
    isDesktop.value = document.documentElement.clientWidth > 900;
  });
});
</script>

<style lang="scss">
</style>