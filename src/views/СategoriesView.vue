<template>
  <div class="сategories">
    <div class="title">
      <router-link :to="{ name: 'Home' }" class="title__h1">
        Категории
      </router-link>
      <div class="title__add" @click="openModal = true">
        <GIcon :name="'add'" />
      </div>
    </div>

    <div class="height__body">
      <GSwiper
        v-for="cat in categories"
        :key="cat.id"
        @right="deleteСategory(cat.id)"
        @left="getEditCategory(cat)"
      >
        <div class="сategories__item">{{ cat.name }}</div>
      </GSwiper>

      <GModal :open="openModal" @close="closeModal()">
        <h2 v-if="!isEdit">Добавить категорию</h2>
        <h2 v-else>Изменить категорию</h2>

        <VInput v-model="category">Название категории</VInput>

        <VButton @click="addCategory(category)" v-if="!isEdit"
          >Добавить</VButton
        >
        <VButton @click="editCategory()" v-else>Изменить</VButton>
      </GModal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import VInput from "@/components/ui/VInput.vue";
import VButton from "@/components/ui/VButton.vue";
import { useCategoriesStore } from "@/stores/categories";

const categories = computed(() => useCategoriesStore().categories);

const openModal = ref(false);
const category = ref("");
const categoryId = ref("");
const isEdit = ref(false);

function getEditCategory(cat) {
  openModal.value = true;
  isEdit.value = true;
  category.value = cat.name;
  categoryId.value = cat.id;
}
function closeModal() {
  openModal.value = false;
  isEdit.value = false;
  category.value = "";
}

async function addCategory(payload) {
  await useCategoriesStore().postCategory(payload);
  closeModal();
}
async function editCategory() {
  await useCategoriesStore().updateCategory(category.value, categoryId.value);
  closeModal();
}
async function deleteСategory(id) {
  await useCategoriesStore().deleteCategory(id);
}
</script>

<style lang="scss">
.сategories {
  &__item {
    font-size: 1.5em;
    margin-bottom: 5px;
    padding: 3px 5px;
    background: $col-bg-light;
  }
}
</style>