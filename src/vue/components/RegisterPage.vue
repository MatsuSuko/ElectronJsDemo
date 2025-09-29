<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1>Créer un compte</h1>
        <p>Commencez votre expérience</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="input-group">
          <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              required
          />
        </div>

        <div class="input-group">
          <input
              v-model="form.pseudo"
              type="text"
              placeholder="Pseudo"
              required
          />
        </div>

        <div class="input-group">
          <div class="password-field">
            <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mot de passe"
                required
            />
            <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                tabindex="-1"
            >
              <span v-if="showPassword">○</span>
              <span v-else>●</span>
            </button>
          </div>
        </div>

        <div class="input-group">
          <div class="password-field">
            <input
                v-model="form.passwordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                placeholder="Confirmer le mot de passe"
                required
            />
            <button
                type="button"
                class="toggle-password"
                @click="showPasswordConfirm = !showPasswordConfirm"
                tabindex="-1"
            >
              <span v-if="showPasswordConfirm">○</span>
              <span v-else>●</span>
            </button>
          </div>
        </div>

        <button type="submit" class="btn-primary">
          Créer mon compte
        </button>
      </form>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <div class="divider"></div>

      <div class="auth-footer">
        <p>Vous avez déjà un compte ?</p>
        <router-link to="/login" class="link">Se connecter</router-link>
      </div>
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
      showPassword: false,
      showPasswordConfirm: false,
      error: '',
      success: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.error = '';
        this.success = '';

        if (this.form.password !== this.form.passwordConfirm) {
          this.error = 'Les mots de passe ne correspondent pas';
          return;
        }

        const response = await api.signup(this.form);

        if (response.code === '200') {
          this.success = 'Compte créé avec succès';
          setTimeout(() => {
            this.$router.push('/login');
          }, 1500);
        } else {
          this.error = response.message || 'Erreur lors de la création';
        }
      } catch (err) {
        this.error = 'Impossible de se connecter au serveur';
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
}

.auth-container {
  background: white;
  padding: 60px 50px;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 20px 60px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 440px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 48px;
}

.auth-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.auth-header p {
  color: #86868b;
  font-size: 17px;
  font-weight: 400;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 400;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fbfbfd;
}

.input-group input:focus {
  outline: none;
  border-color: #000;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
}

.input-group input::placeholder {
  color: #86868b;
}

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  padding-right: 56px;
}

.toggle-password {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #86868b;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 18px;
  user-select: none;
}

.toggle-password:hover {
  color: #000;
}

.toggle-password:active {
  transform: scale(0.95);
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: #000;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 8px;
  letter-spacing: -0.2px;
}

.btn-primary:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.error-message {
  margin-top: 16px;
  padding: 14px 18px;
  background: #fff5f5;
  color: #d1001f;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #ffe0e0;
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.success-message {
  margin-top: 16px;
  padding: 14px 18px;
  background: #f0fdf4;
  color: #15803d;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #bbf7d0;
  animation: fadeIn 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.divider {
  height: 1px;
  background: #e5e5e7;
  margin: 32px 0;
}

.auth-footer {
  text-align: center;
}

.auth-footer p {
  color: #86868b;
  font-size: 15px;
  margin-bottom: 12px;
  font-weight: 400;
}

.link {
  color: #0071e3;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  transition: color 0.2s ease;
  display: inline-block;
}

.link:hover {
  color: #0077ed;
  text-decoration: underline;
}
</style>