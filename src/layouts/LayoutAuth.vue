<template>
  <div class="auth">
    <div class="auth__form slide-wrap">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <div class="auth__tabs">
      <VTabs :tabs="tabs" v-model="authTabs" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import VTabs from "@/components/ui/VTabs.vue";
const router = useRouter();
const route = useRoute();

const tabs = ["Авторизация", "Регистрация"];
const authTabs = ref(tabs[0]);

watch(authTabs, async (newValue) => {
  newValue === "Авторизация" && router.push({ name: "Login" });
  newValue === "Регистрация" && router.push({ name: "Registration" });
});
</script>

<style lang="scss">
.auth {
  height: calc(100dvh - 10px);
  border: 2px solid $col-basic;
  padding: 10px;
  display: flex;
  flex-direction: column;
  &__form {
    flex-grow: 1;
  }
  &__tabs {
    height: 6dvh;
  }
}
</style>
