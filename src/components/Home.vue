<template>
    <div>
      <h1>Bem-vindo à Home!</h1>
      <button @click="handleLogout">Logout</button>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase';
  import { signOut } from 'firebase/auth';

  export default {
    name: 'Home',
    methods: {
        async handleLogout() {
          await signOut(auth);
          this.$router.push('/login');
        }
    }
  };
  </script>
  
  <style>
  h1 {
    text-align: center;
  }
  </style>