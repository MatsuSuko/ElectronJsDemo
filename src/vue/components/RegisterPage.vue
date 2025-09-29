<template>
  <div class="page">
    <div class="card">
      <h1>Inscription</h1>

      <form @submit.prevent="handleRegister">
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Mot de passe" required />
        <input v-model="form.passwordConfirm" type="password" placeholder="Confirmer mot de passe" required />
        <input v-model="form.pseudo" placeholder="Pseudo" required />
        <input v-model="form.city" placeholder="Ville" />
        <input v-model="form.cityCode" placeholder="Code postal" />
        <input v-model="form.phone" placeholder="Téléphone" />

        <button type="submit">S'inscrire</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>

      <p class="link">
        Déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirm: '',
        pseudo: '',
        city: '',
        cityCode: '',
        phone: ''
      },
      error: '',
      success: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.error = '';
        this.success = '';

        // Vérification côté client
        if (this.form.password !== this.form.passwordConfirm) {
          this.error = 'Les mots de passe ne correspondent pas';
          return;
        }

        const response = await api.signup(this.form);

        console.log('Réponse signup:', response); // Pour débugger

        if (response.code === '200') {
          this.success = 'Inscription réussie ! Redirection...';
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.error = response.message || 'Erreur d\'inscription';
        }
      } catch (err) {
        console.error('Erreur signup:', err);
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
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
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
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #218838;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.success {
  color: green;
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