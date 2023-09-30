<template>
  <nav class="flex items-center justify-center py-4" v-if="totalPages">
    <ul class="flex space-x-4">
      <li>
        <button
          id="prev-button"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <i class="fas fa-chevron-left mr-1 mt-1"></i>
        </button>
      </li>
      <li class="flex items-center text-gray-600">
        Page {{ currentPage }} of {{ totalPages }}
      </li>
      <li>
        <button
          id="next-button"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <i class="fas fa-chevron-right ml-1 mt-1"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>
