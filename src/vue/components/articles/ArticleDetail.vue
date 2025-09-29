<template>
  <div class="detail-page">
    <div class="header-bar">
      <div class="header-content">
        <button @click="goBack" class="btn-back">
          ← Articles
        </button>
      </div>
    </div>

    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="article" class="article-wrapper">
        <div class="article-hero">
          <img
              v-if="article.imgPath"
              :src="article.imgPath + '?t=' + Date.now()"
              :alt="article.title"
              class="hero-image"
              @error="handleImageError"
          />
          <div v-else class="hero-placeholder">
            <span>—</span>
          </div>
        </div>

        <div class="article-content">
          <span class="author-name">{{ article.author }}</span>

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-body">
            <p>{{ article.desc }}</p>
          </div>

          <div class="article-actions">
            <button @click="editArticle" class="btn-edit">
              Modifier
            </button>
            <button @click="deleteArticle" class="btn-delete">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div v-else class="error-state">
        <h2>Article introuvable</h2>
        <button @click="goBack" class="btn-back-error">
          Retour
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api';

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
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
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
      e.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
.detail-page {
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
  max-width: 900px;
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
  max-width: 900px;
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

.article-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
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

.article-hero {
  width: 100%;
  height: 460px;
  overflow: hidden;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-placeholder {
  font-size: 80px;
  color: #d2d2d7;
  font-weight: 300;
}

.article-content {
  padding: 48px;
}

.author-name {
  display: inline-block;
  font-size: 13px;
  color: #86868b;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.article-title {
  font-size: 40px;
  font-weight: 700;
  color: #000;
  margin-bottom: 24px;
  line-height: 1.1;
  letter-spacing: -1px;
}

.article-body {
  font-size: 19px;
  line-height: 1.6;
  color: #1d1d1f;
  margin-bottom: 48px;
}

.article-body p {
  margin-bottom: 16px;
}

.article-actions {
  display: flex;
  gap: 12px;
  padding-top: 32px;
  border-top: 1px solid #f5f5f7;
}

.btn-edit {
  flex: 1;
  padding: 14px;
  background: #000;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-edit:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-delete {
  flex: 1;
  padding: 14px;
  background: transparent;
  color: #d1001f;
  border: 1px solid #d1001f;
  border-radius: 10px;
  font-weight: 500;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-delete:hover {
  background: #d1001f;
  color: white;
}

.error-state {
  text-align: center;
  padding: 100px 20px;
}

.error-state h2 {
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 32px;
}

.btn-back-error {
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

.btn-back-error:hover {
  background: #1d1d1f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>