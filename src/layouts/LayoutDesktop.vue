<template>
  <div class="desktop">
    <StorageView></StorageView>
    <AcceptView></AcceptView>
    <GiveView></GiveView>
    <CategoriesView></CategoriesView>
    <OrganizationsView></OrganizationsView>
    <GiversView></GiversView>
    <HistoryView></HistoryView>
  </div>
</template>

<script setup>
import StorageView from "@/views/StorageView.vue";
import AcceptView from "@/views/AcceptView.vue";
import GiveView from "@/views/GiveView.vue";
import CategoriesView from "@/views/СategoriesView.vue";
import OrganizationsView from "@/views/OrganizationsView.vue";
import GiversView from "@/views/GiversView.vue";
import HistoryView from "@/views/HistoryView.vue";
</script>

<style lang="scss">
*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: $col-basic;
  border-radius: 10px;
}
body {
  font-size: 13px;
  & svg {
    font-size: 18px;
  }
  & .list {
    max-height: calc(3dvh * 4);
    &__item {
      height: 3dvh;
    }
  }
}
.desktop {
  display: grid;
  grid-template-columns: 27% 23% 23% calc(27% - 15px);
  grid-template-rows: repeat(6, calc((100dvh - 45px) / 6));
  grid-template-areas:
    "S B D H"
    "S B D H"
    "S B F H"
    "S C F H"
    "S C E H"
    "S C E H";
  column-gap: 5px;
  row-gap: 5px;

  & .storage {
    border: 2px solid $col-bg-light;
    padding: 2px;
    grid-area: S;
    & .height__body {
      height: calc((100dvh - 20px) - (6dvh - 10px) - 5px - 8px);
    }
  }
  & .accept {
    --c-basic: #56ac00;
    grid-area: B;
    height: calc((100dvh - 25px) / 2 + 20px);
    border: 2px solid $col-bg-light;
    padding: 2px;
    overflow: auto;
    & .input,
    .check {
      padding: 0 5px;
    }
    & .input {
      & label {
        height: 50px;
        font-size: 1.1em;
        & * {
          height: 25px;
          top: 25px;
        }
        & input.notEmpty + span,
        input:focus + span {
          top: 0;
        }
      }
    }
  }
  & .give {
    --c-basic: #ff0000;
    grid-area: C;
    margin-top: 20px;
    // height: calc((100dvh - 25px) / 2);
    border: 2px solid $col-bg-light;
    padding: 2px;
    overflow: auto;
    & .input,
    .check {
      padding: 0 5px;
    }
    & .input {
      & label {
        height: 50px;
        font-size: 1.1em;
        & * {
          height: 25px;
          top: 25px;
        }
        & input.notEmpty + span,
        input:focus + span {
          top: 0;
        }
      }
    }
  }
  & .сategories {
    --c-basic: #ff7a00;
    grid-area: D;
    height: calc((100dvh - 45px) / 3 + 5px);
    border: 2px solid $col-bg-light;
    padding: 2px;
  }
  & .organization {
    --c-basic: #ff7a00;
    grid-area: F;
    height: calc((100dvh - 45px) / 3 + 5px);
    border: 2px solid $col-bg-light;
    padding: 2px;
  }
  & .givers {
    --c-basic: #ff7a00;
    grid-area: E;
    height: calc((100dvh - 45px) / 3 + 5px);
    border: 2px solid $col-bg-light;
    padding: 2px;
  }
  & .history {
    --c-basic: #7808a9;
    border: 2px solid $col-bg-light;
    padding: 2px;
    grid-area: H;
    & .height__body {
      height: calc((100dvh - 20px) - (6dvh - 10px) - 5px - 8px);
    }
  }
  & .height__body {
    height: calc(((100dvh - 45px) / 3) - (6dvh - 10px) - 5px - 4px);
  }
  & .title {
    height: calc(6dvh - 10px);
    line-height: calc(6dvh - 10px);
    font-size: 1.5em;
    &__add {
      width: calc(6dvh - 10px);
    }
  }
  & h1 {
    height: calc(6dvh - 10px);
    font-size: 1.5em;
    line-height: calc(6dvh - 10px);
  }
}
</style>