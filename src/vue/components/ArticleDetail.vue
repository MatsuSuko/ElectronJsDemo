<template>
  <div class="page">
    <button @click="goBack" class="back-btn">← Retour</button>

    <div v-if="article" class="article-detail">
      <img
          v-if="article.imgPath"
          :src="article.imgPath + '?t=' + Date.now()"
          :alt="article.title"
          class="article-image"
          @error="handleImageError"
      />
      <h1>{{ article.title }}</h1>
      <p class="author">Par {{ article.author }}</p>
      <p class="description">{{ article.desc }}</p>

      <div class="actions">
        <button @click="editArticle" class="edit-btn">Modifier</button>
        <button @click="deleteArticle" class="delete-btn">Supprimer</button>
      </div>
    </div>

    <p v-else-if="loading">Chargement...</p>
    <p v-else>Article non trouvé</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      article: null,
      loading: true
    };
  },
  async mounted() {
    await this.loadArticle();
  },
  watch: {
    '$route.params.id'() {
      this.loadArticle();
    }
  },
  methods: {
    async loadArticle() {
      try {
        this.loading = true;
        const id = this.$route.params.id;
        const response = await api.getArticle(id);

        console.log('Article rechargé:', response.data);

        if (response.code === '200') {
          this.article = response.data;
        }
      } catch (err) {
        console.error('Erreur chargement article:', err);
      } finally {
        this.loading = false;
      }
    },
    async deleteArticle() {
      if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
        try {
          const response = await api.deleteArticle(this.article.id);
          if (response.code === '200') {
            this.$router.push('/articles');
          }
        } catch (err) {
          alert('Erreur lors de la suppression');
        }
      }
    },
    editArticle() {
      this.$router.push(`/articles/${this.article.id}/edit`);
    },
    goBack() {
      this.$router.push('/articles');
    },
    handleImageError(e) {
      console.log('Erreur chargement image:', e.target.src);
      e.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
.page {
  padding: 20px;
  max-width: 800px;
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

.article-detail {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.article-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.article-detail h1 {
  margin-bottom: 10px;
}

.author {
  color: #999;
  margin-bottom: 30px;
}

.description {
  line-height: 1.6;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn:hover {
  background: #0056b3;
}

.delete-btn:hover {
  background: #c82333;
}
</style>