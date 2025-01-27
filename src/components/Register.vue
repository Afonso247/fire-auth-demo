<template>
  <div class="register">
    <h1>Registrar-se</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" placeholder="Seu email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="password" type="password" id="password" placeholder="Sua senha" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Senha:</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Confirme sua senha" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p>Já possui uma conta? <router-link to="/login">Login</router-link></p>
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
      this.error = 'As senhas não coincidem.';
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, this.email, this.password);
      this.error = 'Usuário registrado com sucesso!'; // Set success message
      this.$router.push('/login'); // Redirect to login after a delay (optional)
      // You can optionally add a timeout for automatic redirection after a few seconds
      // setTimeout(() => this.$router.push('/login'), 2000); // Redirect after 2 seconds
    } catch (error) {
      this.error = 'Erro ao registrar-se: ' + error.message;
    }
  },
},
};
</script>

<style>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>