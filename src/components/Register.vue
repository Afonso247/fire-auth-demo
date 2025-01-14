<template>
    <div>
      <h1>Registrar-se</h1>
      <form>
        <label>Nome:</label>
        <input type="text" />
  
        <label>Email:</label>
        <input type="email" />
  
        <label>Senha:</label>
        <input type="password" />

        <label>Confirmar Senha:</label>
        <input type="password" />
  
        <button type="submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  </style>