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

      <button type="submit">Salvar informações</button>
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
    };
  },
  methods: {
    async handleLogout() {
      await signOut(auth);
      this.$router.push("/login");
    },
    async saveUserInfo() {
      const user = auth.currentUser;

      if (user) {
        // Salvar no Realtime Database
        const userRef = dbRef(database, `users/${user.uid}`);
        await set(userRef, this.userInfo)
          .then(() => {
            this.saved = true; // Exibe mensagem de confirmação
            setTimeout(() => (this.saved = false), 3000); // Remove a mensagem após 3 segundos
          })
          .catch((error) => {
            console.error("Erro ao salvar informações no Realtime Database:", error);
          });

        // Salvar no Firestore
        try {
          const userDocRef = doc(db, "users", user.uid); // Documento do usuário no Firestore
          await setDoc(userDocRef, this.userInfo);
          console.log("Informações salvas no Firestore com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar informações no Firestore:", error);
        }
      } else {
        console.error("Usuário não autenticado!");
      }
    },
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
