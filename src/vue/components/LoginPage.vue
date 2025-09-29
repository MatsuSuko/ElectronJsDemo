<template>
  <div class="page">
    <div class="card">
      <h1>Connexion</h1>

      <form @submit.prevent="handleLogin">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
        />

        <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
        />

        <button type="submit">Se connecter</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="link">
        Pas de compte ?
        <router-link to="/register">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      email: 'isaac@gmail.com',
      password: 'password',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = '';
        const response = await api.login(this.email, this.password);

        if (response.code === '200') {
          this.$router.push('/articles');
        } else {
          this.error = response.message || 'Erreur de connexion';
        }
      } catch (err) {
        this.error = 'Erreur de connexion au serveur';
      }
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 400px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.link {
  margin-top: 20px;
  text-align: center;
}

.link a {
  color: #007bff;
  text-decoration: none;
}
</style>