import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";
import { useBoxesStore } from "./boxes";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref([]);

  async function getCategories() {
    let { data: CATEGORIES, error } = await supabase
      .from("CATEGORIES")
      .select("*");
    categories.value = CATEGORIES;
  }

  async function postCategory(payload) {
    const { data, error } = await supabase
      .from("CATEGORIES")
      .insert([{ name: payload }])
      .select();
    categories.value.push(data[0]);
  }

  async function updateCategory(payload, id) {
    await supabase.from("CATEGORIES").update({ name: payload }).eq("id", id);
    getCategories();
    useBoxesStore().getBoxes();
  }

  async function deleteCategory(id) {
    await supabase.from("CATEGORIES").delete().eq("id", id);
    getCategories();
  }

  return {
    categories,
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory,
  };
});
