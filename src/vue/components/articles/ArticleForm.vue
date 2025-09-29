<template>
  <div class="form-page">
    <div class="header-bar">
      <div class="header-content">
        <button @click="goBack" class="btn-back">
          ← Annuler
        </button>
      </div>
    </div>

    <div class="container">
      <div class="form-wrapper">
        <div class="form-header">
          <h1>{{ isEdit ? 'Modifier' : 'Nouvel article' }}</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="article-form">
          <div class="form-group">
            <label>Titre</label>
            <input
                v-model="form.title"
                type="text"
                placeholder="Un titre captivant"
                required
            />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
                v-model="form.desc"
                placeholder="Votre contenu"
                required
            ></textarea>
          </div>

          <div class="form-group">
            <label>Auteur</label>
            <input
                v-model="form.author"
                type="text"
                placeholder="Votre nom"
                required
            />
          </div>

          <div class="form-group">
            <label>Image <span class="optional">(optionnel)</span></label>
            <input
                v-model="form.imgPath"
                type="text"
                placeholder="URL de l'image"
            />
          </div>

          <div v-if="form.imgPath" class="image-preview">
            <img :src="form.imgPath" alt="Aperçu" @error="imageError" />
          </div>

          <button type="submit" class="btn-submit">
            {{ isEdit ? 'Sauvegarder' : 'Publier' }}
          </button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="imageErrorMsg" class="warning-message">{{ imageErrorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  data() {
    return {
      form: {
        id: null,
        title: '',
        desc: '',
        author: '',
        imgPath: ''
      },
      error: '',
      imageErrorMsg: '',
      isEdit: false
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      await this.loadArticle(id);
    }
  },
  methods: {
    async loadArticle(id) {
      try {
        const response = await api.getArticle(id);

        if (response.code === '200') {
          this.form.id = response.data.id;
          this.form.title = response.data.title;
          this.form.desc = response.data.desc;
          this.form.author = response.data.author;
          this.form.imgPath = response.data.imgPath || '';
        }
      } catch (err) {
        this.error = 'Erreur chargement article';
      }
    },
    async handleSubmit() {
      try {
        this.error = '';
        this.imageErrorMsg = '';

        const response = await api.saveArticle(this.form);

        if (response.code === '200') {
          this.$router.push('/articles');
        } else {
          this.error = response.message || 'Erreur lors de la sauvegarde';
        }
      } catch (err) {
        this.error = 'Erreur de connexion au serveur';
      }
    },
    imageError() {
      this.imageErrorMsg = 'Image non valide';
    },
    goBack() {
      this.$router.push('/articles');
    }
  }
};
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  background: #fafafa;
}

.header-bar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px 40px;
}

.btn-back {
  padding: 8px 16px;
  background: transparent;
  color: #86868b;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back:hover {
  color: #000;
  border-color: #000;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 40px 80px;
}

.form-wrapper {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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

.form-header {
  margin-bottom: 40px;
}

.form-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #000;
  letter-spacing: -0.5px;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 15px;
  font-weight: 500;
  color: #000;
}

.optional {
  color: #86868b;
  font-weight: 400;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fbfbfd;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #000;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
}

.form-group textarea {
  min-height: 180px;
  resize: vertical;
}

.image-preview {
  margin-top: 8px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f5f5f7;
}

.image-preview img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  display: block;
}

.btn-submit {
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

.btn-submit:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-submit:active {
  transform: translateY(0);
}

.error-message {
  margin-top: 20px;
  padding: 14px 18px;
  background: #fff5f5;
  color: #d1001f;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #ffe0e0;
}

.warning-message {
  margin-top: 20px;
  padding: 14px 18px;
  background: #fffbeb;
  color: #ca8a04;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #fef3c7;
}
</style>