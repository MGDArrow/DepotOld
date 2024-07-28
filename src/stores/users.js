import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";

export const useUsersStore = defineStore("users", () => {
  const user = ref("");

  async function signUp(payload) {
    let { data, error } = await supabase.auth.signUp(payload);
  }
  async function logIn(payload) {
    let { data, error } = await supabase.auth.signInWithPassword(payload);
  }
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    user.value = data?.session?.user?.user_metadata?.username;
    return data;
  }

  return {
    user,
    signUp,
    logIn,
    getSession,
  };
});
