<template>
  <div class="home">
    <h1>Bem-vindo!</h1>
    <p>Você está logado.</p>

    <form @submit.prevent="saveUserInfo">
      <h2>Fale sobre você:</h2>

      <label for="name">Nome:</label>
      <input v-model="userInfo.name" id="name" placeholder="Digite seu nome" required />

      <label for="age">Idade:</label>
      <input v-model="userInfo.age" id="age" type="number" placeholder="Digite sua idade" required />

      <label for="profession">Profissão:</label>
      <input v-model="userInfo.profession" id="profession" placeholder="Digite sua profissão" required />

      <label for="dream">Sonho:</label>
      <input v-model="userInfo.dream" id="dream" placeholder="Digite seu sonho" />

      <button type="submit" :disabled="isSaving">{{ isSaving ? "Salvando..." : "Salvar informações" }}</button>
    </form>

    <div v-if="saved">
      <h3>Suas informações foram salvas!</h3>
    </div>

    <button @click="handleLogout">Sair</button>
  </div>
</template>

<script>
import { ref as dbRef, set } from "firebase/database";
import { auth, database, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importando as funções do Firestore

export default {
  name: "Home",
  data() {
    return {
      userInfo: {
        name: "",
        age: "",
        profession: "",
        dream: "", // Adicionando o campo de sonho
      },
      saved: false, // Estado para exibir mensagem de confirmação
      isSaving: false,
    };
  },
  methods: {
    async handleLogout() {
      await signOut(auth);
      this.$router.push("/login");
    },
    async saveUserInfo() {
      this.isSaving = true;
      const user = auth.currentUser;

      if (user) {
        const dataToSave = {
          ...this.userInfo, // Dados do formulário
          uid: user.uid,    // ID único do usuário
          email: user.email // Email do usuário
        };

        try {
          // Salvar no Realtime Database
          const userRef = dbRef(database, `users/${user.uid}`);
          await set(userRef, dataToSave);

          // Salvar no Firestore
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, dataToSave);

          // Atualizar estado de sucesso
          this.saved = true;
          setTimeout(() => (this.saved = false), 3000); // Remove mensagem após 3 segundos
          console.log("Informações salvas com sucesso no Firebase!");
        } catch (error) {
          console.error("Erro ao salvar informações:", error);
          alert("Ocorreu um erro ao salvar suas informações. Tente novamente mais tarde.");
        } finally {
          this.isSaving = false;
        }
      } else {
        console.error("Usuário não autenticado!");
        alert("Você precisa estar logado para salvar as informações.");
      }
    }
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f0f0f0;
  height: 100vh;
}

h1 {
  font-size: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

label {
  font-weight: bold;
}

input {
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h3 {
  color: green;
  font-size: 1.2rem;
}
</style>
