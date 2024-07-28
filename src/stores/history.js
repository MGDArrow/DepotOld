import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient.js";
import { useUsersStore } from "./users";

export const useHistoryStore = defineStore("history", () => {
  async function postHistoryAccept(payload, organization) {
    let history = {
      who: useUsersStore().user,
      date: getDate(),
      name: payload.name,
      count: payload.count,
      dateLife: payload.dateLife,
      organization: organization,
    };
    await supabase.from("HISTORY").insert([history]);
  }
  async function postHistoryGive(payload, count, giver) {
    let history = {
      who: useUsersStore().user,
      date: getDate(),
      name: payload.name,
      dateLife: payload.dateLife,
      count: count,
      giver: giver,
    };
    await supabase.from("HISTORY").insert([history]);
  }
  async function postHistoryChange(id, payload) {
    let { data: BOXES, error } = await supabase
      .from("BOXES")
      .select("*")
      .eq("id", id);

    let history = {
      who: useUsersStore().user,
      date: getDate(),
      name: BOXES[0].name,
      dateLife: BOXES[0].dateLife,
      count: BOXES[0].count,
      change: {
        name: payload.name,
        dateLife: payload.dateLife,
        count: payload.count,
      },
    };
    await supabase.from("HISTORY").insert([history]);
  }

  function getDate() {
    let dateNow = new Date();
    return `${dateNow.getFullYear()}-${addZero(
      dateNow.getMonth() + 1
    )}-${addZero(dateNow.getDate())} ${addZero(dateNow.getHours())}:${addZero(
      dateNow.getMinutes()
    )}:${addZero(dateNow.getSeconds())}`;
  }
  let addZero = (num) => (num < 10 ? `0${num}` : num);

  return {
    postHistoryAccept,
    postHistoryGive,
    postHistoryChange,
  };
});
