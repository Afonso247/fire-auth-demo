<template>
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="email" />
  
        <label>Senha:</label>
        <input type="password" />
  
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  </style>