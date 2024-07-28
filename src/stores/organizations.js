import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";

export const useOrganizationsStore = defineStore("organizations", () => {
  const organizations = ref([]);

  async function getOrganizations() {
    let { data: ORGANIZATIONS, error } = await supabase
      .from("ORGANIZATIONS")
      .select("*");
    organizations.value = ORGANIZATIONS;
  }

  async function postOrganization(payload) {
    const { data, error } = await supabase
      .from("ORGANIZATIONS")
      .insert([{ name: payload }])
      .select();
    organizations.value.push(data[0]);
  }

  async function updateOrganization(payload, id) {
    await supabase.from("ORGANIZATIONS").update({ name: payload }).eq("id", id);
    getOrganizations();
  }

  async function deleteOrganization(id) {
    await supabase.from("ORGANIZATIONS").delete().eq("id", id);
    getOrganizations();
  }

  return {
    organizations,
    getOrganizations,
    postOrganization,
    updateOrganization,
    deleteOrganization,
  };
});
