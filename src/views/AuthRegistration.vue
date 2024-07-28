<template>
  <form @submit.prevent="signUp()">
    <h1>Регистрация</h1>
    <VInput v-model.trim="state.username">Имя</VInput>
    <VInput v-model.trim="state.eMail">E-Mail</VInput>
    <VInput v-model.trim="state.password" :type="'password'">Пароль</VInput>
    <VInput v-model.trim="state.passwordConfirm" :type="'password'"
      >Повторный пароль</VInput
    >
    <VButton :disabled="disabled" :error="error">Зарегистрироваться</VButton>
    <VErrors :errors="errors" />
  </form>
</template>
  
  <script setup>
import VInput from "@/components/ui/VInput.vue";
import VButton from "@/components/ui/VButton.vue";
import VErrors from "@/components/ui/VErrors.vue";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, email, sameAs } from "@vuelidate/validators";
import { useUsersStore } from "@/stores/users";

import { useRouter } from "vue-router";
const router = useRouter();

const disabled = ref(false);
const error = ref(false);

const state = reactive({
  username: "",
  eMail: "",
  password: "",
  passwordConfirm: "",
});

const rules = computed(() => ({
  username: {
    required,
    minLength: minLength(4),
  },
  eMail: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(8),
  },
  passwordConfirm: {
    required,
    sameAs: sameAs(state.password),
  },
}));

const errorsMessage = {
  username: {
    required: 'Поле "Имя" не заполнено;',
    minLength: 'Поле "Имя" должно быть не менее 4 символов;',
  },
  eMail: {
    required: 'Поле "E-Mail" не заполнено;',
    email: 'Поле "E-Mail" заполнено не верно;',
  },
  password: {
    required: 'Поле "Пароль" не заполнено;',
    minLength: 'Поле "Пароль" должно быть не менее 8 символов;',
  },
  passwordConfirm: {
    required: 'Поле "Повторный пароль" не заполнено;',
    sameAs: 'Поля "Пароль" и "Повторный пароль" должны совпадать;',
  },
};

const errors = ref([]);

const v$ = useVuelidate(rules, state);

async function signUp() {
  disabled.value = true;
  error.value = false;
  errors.value = [];
  const result = await v$.value.$validate();

  if (result) {
    const payload = {
      email: state.eMail,
      password: state.password,
      options: {
        data: {
          username: state.username,
        },
      },
    };
    try {
      await useUsersStore().signUp(payload);
      router.push({ name: "Login" });
    } catch (err) {
      error.value = true;
    }
  } else {
    console.log(v$.value.$errors);
    v$.value.$errors.forEach((el) => {
      errors.value.push(errorsMessage[el.$property][el.$validator]);
    });
  }
  disabled.value = false;
}
</script>