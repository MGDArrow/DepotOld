<template>
  <div class="home">
    <router-link :to="{ name: 'Storage' }" class="home__depot">
      <div class="isexpired" v-if="isexpired"><GIcon :name="'expired'" /></div>
      <GIcon name="storage" /><span>Склад</span>
    </router-link>
    <router-link :to="{ name: 'Accept' }" class="home__accept">
      <GIcon name="accept" /><span>Принять</span>
    </router-link>
    <router-link :to="{ name: 'Give' }" class="home__accept">
      <GIcon name="give" /><span>Раздать</span>
    </router-link>
    <router-link :to="{ name: 'History' }" class="home__history">
      <GIcon name="calendar" /><span>История</span>
    </router-link>
    <div class="home__groupe">
      <router-link :to="{ name: 'Categories' }">
        <GIcon name="sategories" />
      </router-link>
      <router-link :to="{ name: 'Organizarions' }">
        <GIcon name="organization" />
      </router-link>
      <router-link :to="{ name: 'Givers' }">
        <GIcon name="givers" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useBoxesStore } from "@/stores/boxes";
import { computed } from "vue";

const isexpired = computed(() => {
  return useBoxesStore().boxes.find((el) => {
    if (
      el.dateLife !== "2000-01-01" &&
      +new Date(el.dateLife) - Date.now() <= 1000 * 60 * 60 * 24 * 60
    ) {
      return true;
    } else {
      return false;
    }
  });
});
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: calc(100dvh - 20px);
  gap: 10px;
  &__depot {
    width: 100%;
    height: calc(50% - 10px);
    background: $col-basic;
    position: relative;
  }
  &__accept,
  &__history {
    width: calc(50% - 5px);
    height: calc(20% - 5px);
    background: $col-bg-light;
  }
  &__history {
    height: calc(30% - 5px);
    width: calc(75% - 5px);
  }

  &__groupe {
    display: flex;
    flex-direction: column;
    width: calc(25% - 5px);
    gap: 5px;
    & a {
      background: $col-bg-light;
      width: 100%;
      flex-grow: 1;
      & svg {
        font-size: 1.2em;
      }
    }
  }
  & a {
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.home__depot {
      font-size: 4em;
    }
  }
  & svg {
    display: block;
    font-size: 2em;
  }
  & span {
    width: 100%;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }
}
.isexpired {
  position: absolute;
  top: 20px;
  right: 20px;
  height: 10px;
  align-self: start;
  & svg {
    position: absolute;
    right: 0;
    font-size: 0.5em;
    color: $col-yellow;
  }
}
</style>