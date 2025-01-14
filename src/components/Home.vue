<template>
    <div>
        <h1 v-if="isAuthenticated">Bem-vindo à Home!</h1>
        <h1 v-else>Você não está autenticado.</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
        return {
        isAuthenticated: false // Inicialmente, o usuário não está autenticado
        }
    },
    mounted() {
        // Aqui você pode verificar se o usuário está autenticado.
        // Supondo que você tenha uma função `checkAuthentication` que retorna um valor booleano.
        this.isAuthenticated = this.checkAuthentication()
    },
    methods: {
        checkAuthentication() {
        // Aqui você pode implementar a lógica para verificar se o usuário está autenticado.
        // Por exemplo, você pode verificar se existe um token de autenticação no localStorage.
        // Este é apenas um exemplo e você precisará adaptá-lo de acordo com a lógica de autenticação do seu aplicativo.
        return localStorage.getItem('token') !== null
        }
    }
  };
  </script>
  
  <style>
  h1 {
    text-align: center;
  }
  </style>