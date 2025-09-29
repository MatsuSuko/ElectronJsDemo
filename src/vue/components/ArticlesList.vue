<template>
  <div class="page">
    <div class="header">
      <h1>Liste des Articles</h1>
      <div class="user-actions">
        <span class="username">{{ userEmail }}</span>
        <button @click="createArticle" class="create-btn">+ Nouvel article</button>
        <button @click="logout" class="logout-btn">Déconnexion</button>
      </div>
    </div>

    <div class="articles-grid" v-if="articles.length">
      <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="goToArticle(article.id)"
      >
        <img
            v-if="article.imgPath"
            :src="article.imgPath + '?t=' + Date.now()"
            :alt="article.title"
            class="article-image"
            @error="handleImageError"
        />
        <div class="article-content">
          <h3>{{ article.title }}</h3>
          <p>{{ article.desc }}</p>
          <small>Par {{ article.author }}</small>
        </div>
      </div>
    </div>

    <p v-else-if="loading">Chargement...</p>
    <p v-else>Aucun article disponible</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      articles: [],
      loading: true,
      userEmail: ''
    };
  },
  async mounted() {
    this.userEmail = api.getUserEmail();
    await this.loadArticles();
  },
  async activated() {
    await this.loadArticles();
  },
  watch: {
    '$route'() {
      this.loadArticles();
    }
  },
  methods: {
    async loadArticles() {
      try {
        this.loading = true;
        const response = await api.getArticles();
        console.log('Articles rechargés:', response.data);
        if (response.code === '200') {
          this.articles = response.data;
        }
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      } finally {
        this.loading = false;
      }
    },
    goToArticle(id) {
      this.$router.push(`/articles/${id}`);
    },
    createArticle() {
      this.$router.push('/articles/new');
    },
    logout() {
      api.logout();
      this.$router.push('/login');
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
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  background: #f0f0f0;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.create-btn {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-btn:hover {
  background: #218838;
}

.logout-btn {
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c82333;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.article-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-content h3 {
  margin-bottom: 10px;
}

.article-content p {
  color: #666;
  margin-bottom: 10px;
}

.article-content small {
  color: #999;
}
</style>