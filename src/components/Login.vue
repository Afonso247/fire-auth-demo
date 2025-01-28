<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Seu email" required />
  
        <label>Senha:</label>
        <input v-model="password" type="password" placeholder="Sua senha" required />
  
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não possui uma conta? <router-link to="/register">Registrar-se</router-link></p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase';
  import { signInWithEmailAndPassword } from 'firebase/auth';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async handleLogin() {
        await signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            this.error = 'Erro ao fazer login: ' + error.message;
          });
      },
    },
  };
  </script>
  
  <style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  </style>