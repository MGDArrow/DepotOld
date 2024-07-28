import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";

export const useGiversStore = defineStore("givers", () => {
  const givers = ref([]);

  async function getGivers() {
    let { data: GIVERS, error } = await supabase.from("GIVERS").select("*");
    givers.value = GIVERS;
  }

  async function postGiver(payload) {
    const { data, error } = await supabase
      .from("GIVERS")
      .insert([{ name: payload }])
      .select();
    givers.value.push(data[0]);
  }

  async function updateGiver(payload, id) {
    await supabase.from("GIVERS").update({ name: payload }).eq("id", id);
    getGivers();
  }

  async function deleteGiver(id) {
    await supabase.from("GIVERS").delete().eq("id", id);
    getGivers();
  }

  return {
    givers,
    getGivers,
    postGiver,
    updateGiver,
    deleteGiver,
  };
});
