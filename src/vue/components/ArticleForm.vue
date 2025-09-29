<template>
  <div class="page">
    <button @click="goBack" class="back-btn">← Retour</button>

    <div class="form-container">
      <h1>{{ isEdit ? 'Modifier' : 'Créer' }} un article</h1>

      <form @submit.prevent="handleSubmit">
        <input
            v-model="form.title"
            type="text"
            placeholder="Titre"
            required
        />

        <textarea
            v-model="form.desc"
            placeholder="Description"
            required
        ></textarea>

        <input
            v-model="form.author"
            type="text"
            placeholder="Auteur"
            required
        />

        <input
            v-model="form.imgPath"
            type="text"
            placeholder="URL de l'image (optionnel)"
        />

        <div v-if="form.imgPath" class="image-preview">
          <p>Aperçu de l'image :</p>
          <img :src="form.imgPath" alt="Aperçu" @error="imageError" />
        </div>

        <button type="submit">{{ isEdit ? 'Modifier' : 'Créer' }}</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="imageErrorMsg" class="error">{{ imageErrorMsg }}</p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

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
      this.imageErrorMsg = 'URL d\'image invalide';
    },
    goBack() {
      this.$router.push('/articles');
    }
  }
};
</script>

<style scoped>
.page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.back-btn {
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-btn:hover {
  background: #5a6268;
}

.form-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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

input, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: Arial, sans-serif;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.image-preview {
  margin: 10px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.image-preview p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background: #218838;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>