<template>
  <form @submit.prevent="signIn()">
    <h1>Авторизация</h1>
    <VInput v-model.trim="state.eMail">E-Mail</VInput>
    <VInput v-model.trim="state.password" :type="'password'">Пароль</VInput>
    <VButton :disabled="disabled" :error="error">Войти</VButton>
    <VErrors :errors="errors" />
  </form>
</template>

<script setup>
import VInput from "@/components/ui/VInput.vue";
import VButton from "@/components/ui/VButton.vue";
import VErrors from "@/components/ui/VErrors.vue";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, email } from "@vuelidate/validators";

import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
const router = useRouter();

const disabled = ref(false);
const error = ref(false);

const state = reactive({
  eMail: "",
  password: "",
});

const rules = computed(() => ({
  eMail: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(8),
  },
}));

const errorsMessage = {
  eMail: {
    required: 'Поле "E-Mail" не заполнено;',
    email: 'Поле "E-Mail" заполнено не верно;',
  },
  password: {
    required: 'Поле "Пароль" не заполнено;',
    minLength: 'Поле "Пароль" должно быть не менее 8 символов;',
  },
};

const errors = ref([]);

const v$ = useVuelidate(rules, state);

async function signIn() {
  disabled.value = true;
  error.value = false;
  errors.value = [];
  const result = await v$.value.$validate();

  if (result) {
    const payload = {
      email: state.eMail,
      password: state.password,
    };
    try {
      await useUsersStore().logIn(payload);
      router.push({ name: "Home" });
    } catch (err) {
      error.value = true;
    }
  } else {
    v$.value.$errors.forEach((el) => {
      errors.value.push(errorsMessage[el.$property][el.$validator]);
    });
  }
  disabled.value = false;
}
</script>