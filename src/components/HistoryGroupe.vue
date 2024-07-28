<template>
  <div class="height__body" ref="listEl">
    <div
      class="history__item"
      :class="{
        'item-green': !!item.organization,
        'item-red': !!item.giver,
        'item-yellow': !!item.change,
      }"
      v-for="item in history"
      :key="item.id"
    >
      <div class="history__info">
        <div class="history__who">протоиерей Кирилл Щевелев</div>
        <div class="history__date">{{ getDateFull(item.date) }}</div>
      </div>
      <div class="history__acceptgive" v-if="!item.change">
        <div class="history__nameorggive">
          <div class="history__name">{{ item.name }}</div>
          <div class="history__org-life">
            <div class="history__org-give">
              {{ item.organization || item.giver }}
            </div>
            <div class="history__datelife">
              {{ getDateNormal(item.dateLife) }}
            </div>
          </div>
        </div>
        <div class="history__count">{{ item.count }}</div>
      </div>
      <div class="history__change" v-else>
        <div class="history__change-item" v-if="item.name === item.change.name">
          <div class="history__change-item--data-one">{{ item.name }}</div>
        </div>
        <div class="history__change-item" v-if="item.name !== item.change.name">
          <div class="history__change-item--name">Название:</div>
          <div class="history__change-item--data">{{ item.name }}</div>
          <div class="history__change-item--arrow">&#8658;</div>
          <div class="history__change-item--data">{{ item.change.name }}</div>
        </div>
        <div
          class="history__change-item"
          v-if="item.count !== item.change.count"
        >
          <div class="history__change-item--name">Количество:</div>
          <div class="history__change-item--data">{{ item.count }}</div>
          <div class="history__change-item--arrow">&#8658;</div>
          <div class="history__change-item--data">{{ item.change.count }}</div>
        </div>
        <div
          class="history__change-item"
          v-if="item.dateLife !== item.change.dateLife"
        >
          <div class="history__change-item--name">Срок годности:</div>
          <div class="history__change-item--data">{{ item.dateLife }}</div>
          <div class="history__change-item--arrow">&#8658;</div>
          <div class="history__change-item--data">
            {{ item.change.dateLife }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { useInfiniteScroll } from "@vueuse/core";

const listEl = ref(null);

const itemToShow = 15;

const history = ref(await getItems(0, itemToShow));

const isItemsInFetch = ref(true);

async function getItems(start, end) {
  let { data: HISTORY, error } = await supabase
    .from("HISTORY")
    .select("*")
    .order("date", { ascending: false })
    .range(start, end);
  return HISTORY;
}
async function getItemsOnScroll(start) {
  if (isItemsInFetch.value) {
    try {
      const newItems = await getItems(start, start + itemToShow);
      history.value.push(...newItems);
      isItemsInFetch.value = !!newItems[0];
    } catch (err) {
      console.log(err);
    }
  }
}
useInfiniteScroll(
  listEl,
  async () => {
    await getItemsOnScroll(history.value.length);
  },
  { distance: 10 }
);

function getDateFull(date) {
  let d = date.split("T");
  d[0] = d[0].split("-").reverse().join("-");
  return d.join(" ");
}
function getDateNormal(date) {
  return date !== "2000-01-01" ? date.split("-").reverse().join("-") : "∞";
}
</script>


<style lang="scss">
.item-green {
  border-left: 7px solid $col-green;
}
.item-red {
  border-left: 7px solid $col-red;
}
.item-yellow {
  border-left: 7px solid $col-yellow;
}
.history {
  &__item {
    font-size: 1.5em;
    margin-bottom: 10px;
    background: $col-bg;
  }
  &__info {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $col-bg-light;
    padding: 0 7px;
  }
  &__who,
  &__date {
    width: 60%;
    text-align: center;
    font-size: 0.65em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__date {
    width: 40%;
  }
  &__acceptgive {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 7px;
  }
  &__nameorggive {
    width: 75%;
  }
  &__name {
    text-align: center;
    font-size: 1em;
  }
  &__org-life {
    font-size: 0.65em;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__org-give {
    width: 70%;
  }
  &__datelife {
    width: 30%;
    color: $col-basic;
  }
  &__count {
    width: 25%;
    text-align: center;
    font-size: 1.3em;
  }
  &__change {
    padding: 0 7px;
    font-size: 0.8em;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px 0;
      &--name {
        width: 30%;
        text-align: right;
        color: $col-basic;
      }
      &--data {
        width: 30%;
        text-align: center;
        &-one {
          font-size: 1.3em;
        }
      }
      &--arrow {
        color: $col-basic;
        width: 10%;
        text-align: center;
        font-size: 1.3em;
      }
    }
  }
}
</style>