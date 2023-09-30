<template>
  <div class="bg-white rounded-lg shadow-md">
    <div class="p-4 text-xl font-medium">Most Popular Books of All Time</div>

    <div v-if="loading" class="p-4 text-center">
      <i class="fas fa-spinner fa-spin animate-spin"></i>
      <p>Loading...</p>
    </div>

    <BookTable v-if="!loading" :books="filteredBooks"></BookTable>

    <pagination
      :totalPages="meta.total_pages"
      :currentPage="this.meta.current_page"
      @page-change="changePage"
    ></pagination>
  </div>
</template>

<script>
import axios from "axios";
import BookTable from "../components/BookTable.vue";
import Pagination from "../components/BookPagination.vue";

export default {
  components: {
    BookTable,
    Pagination,
  },
  data() {
    return {
      booksPerPage: 5,
      books: [],
      meta: {
        current_page: 1,
        total_pages: 1,
      },
      loading: false,
    };
  },
  created() {
    this.meta.current_page = parseInt(this.$route.query.page) || 1;
    this.fetchBooks();
  },
  computed: {
    filteredBooks() {
      return this.books.slice(0, this.booksPerPage);
    },
  },
  methods: {
    async fetchBooks() {
      this.loading = true;
      try {
        const response = await axios.get("/discovery/api/books", {
          params: {
            size: 5,
            page: this.meta.current_page,
          },
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
          credentials: "include",
        });
        this.books = response.data.books;
        this.meta = response.data.meta;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
        delete this.meta.total_pages;
      } finally {
        this.loading = false;
      }
    },
    changePage(newPage) {
      this.meta.current_page = newPage;
      this.fetchBooks();
      this.$router.replace({ query: { page: newPage } });
    },
  },
};
</script>
