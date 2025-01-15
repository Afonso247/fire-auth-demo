<template>
    <div>
      <h1>Registrar-se</h1>
      <form @submit.prevent="handleRegister">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Seu email" required />
  
        <label>Senha:</label>
        <input v-model="password" type="password" placeholder="Sua senha" required />

        <label>Confirmar Senha:</label>
        <input v-model="confirmPassword" type="password" placeholder="Confirme sua senha" required />
  
        <button type="submit">Registrar</button>
      </form>
      <p>Já possui uma conta? <router-link to="/login">Login</router-link></p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';

  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
      };
    },
    methods: {
      async handleRegister() {
        if (this.password !== this.confirmPassword) {
          this.error = 'As senhas não coincidem.';
          return;
        }
  
        await createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/login');
          })
          .catch((error) => {
            this.error = 'Erro ao registrar-se: ' + error.message;
          });
      },
    },
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  </style>