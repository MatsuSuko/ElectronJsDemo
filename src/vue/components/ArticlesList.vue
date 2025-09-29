<template>
  <div class="articles-page">
    <div class="header-bar">
      <div class="header-content">
        <div class="brand">
          <h1>Canis</h1>
        </div>

        <div class="header-actions">
          <div class="user-info">
            <span>{{ userEmail }}</span>
          </div>
          <button @click="createArticle" class="btn-new">
            Nouveau
          </button>
          <button @click="logout" class="btn-logout">
            Déconnexion
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="articles.length" class="articles-grid">
        <div
            v-for="article in articles"
            :key="article.id"
            class="article-card"
            @click="goToArticle(article.id)"
        >
          <div class="card-image">
            <img
                v-if="article.imgPath"
                :src="article.imgPath + '?t=' + Date.now()"
                :alt="article.title"
                @error="handleImageError"
            />
            <div v-else class="placeholder-image">
              <span>—</span>
            </div>
          </div>

          <div class="card-content">
            <h3>{{ article.title }}</h3>
            <p class="description">{{ article.desc }}</p>
            <span class="author">{{ article.author }}</span>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <h2>Aucun article</h2>
        <p>Commencez par créer votre premier article</p>
        <button @click="createArticle" class="btn-create-empty">
          Créer un article
        </button>
      </div>
    </div>
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
      e.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
.articles-page {
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.brand h1 {
  font-size: 28px;
  font-weight: 600;
  color: #000;
  letter-spacing: -0.5px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  font-size: 15px;
  color: #86868b;
  font-weight: 400;
}

.btn-new {
  padding: 8px 16px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.2px;
}

.btn-new:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-new:active {
  transform: translateY(0);
}

.btn-logout {
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

.btn-logout:hover {
  color: #000;
  border-color: #000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px 80px;
}

.loading {
  text-align: center;
  padding: 80px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.placeholder-image {
  font-size: 48px;
  color: #d2d2d7;
  font-weight: 300;
}

.card-content {
  padding: 24px;
}

.card-content h3 {
  font-size: 21px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.description {
  color: #86868b;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  font-size: 13px;
  color: #b0b0b5;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
}

.empty-state h2 {
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.empty-state p {
  font-size: 17px;
  color: #86868b;
  margin-bottom: 32px;
}

.btn-create-empty {
  padding: 12px 28px;
  background: #000;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-create-empty:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>