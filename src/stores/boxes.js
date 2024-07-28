import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";

export const useBoxesStore = defineStore("boxes", () => {
  const boxes = ref([]);

  async function getBoxes() {
    let { data: BOXES, error } = await supabase
      .from("BOXES")
      .select(`id, name, count, dateLife, category(name)`)
      .neq("count", 0)
      .order("category", { ascending: true })
      .order("dateLife", { ascending: true })
      .order("name", { ascending: true });
    boxes.value = BOXES;
  }

  async function getBoxFilt(name, dateLife) {
    let { data: BOXES, error } = await supabase
      .from("BOXES")
      .select("*")
      .eq("name", name)
      .eq("dateLife", dateLife);
    return BOXES;
  }

  async function postBox(payload) {
    await supabase.from("BOXES").insert([payload]);
    getBoxes();
  }

  async function editBoxCount(box, count) {
    await supabase.from("BOXES").update({ count: count }).eq("id", box.id);
    getBoxes();
  }

  async function editBox(id, payload) {
    await supabase.from("BOXES").update(payload).eq("id", id);
    getBoxes();
  }

  async function deleteBox(id) {
    await supabase.from("BOXES").delete().eq("id", id);
    getBoxes();
  }

  return {
    boxes,
    getBoxes,
    getBoxFilt,
    postBox,
    editBoxCount,
    editBox,
    deleteBox,
  };
});
