<template>
  <icomoon :iconSet="iconSet" v-bind="props" :size="'1em'" />
</template>
	
<script setup>
import { Icomoon } from "vue-icomoon";
import iconSet from "@/assets/selection.json";
const props = defineProps({
  name: String,
});
</script>