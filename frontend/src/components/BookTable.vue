<template>
  <div class="overflow-x-auto">
    <table v-if="books.length > 0" class="w-full table-fixed">
      <colgroup>
        <col class="w-3/4" />
        <col class="w-1/4" />
        <col class="w-1/4" />
        <col class="w-1/4" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col"
            class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(book, index) in books" :key="book.id">
          <tr
            class="cursor-pointer"
            :id="'book-' + index"
            :class="index % 2 === 0 ? 'bg-beige' : 'bg-white'"
            @click="toggleDetails(book)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-21 w-16">
                  <img
                    :src="book.cover.url"
                    alt="Book Cover"
                    class="h-21 w-16 object-cover rounded"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm leading-5 font-medium relative">
                    {{ book.title }}
                    <span
                      v-if="book.explicit_content"
                      class="text-xs bg-red-500 text-white rounded-lg px-2 py-1"
                      >Explicit</span
                    >
                  </div>
                  <div class="text-sm leading-5 font-medium text-gray-400">
                    {{ book.author }}
                  </div>
                  <span
                    v-for="gen in getGenres(book)"
                    :key="gen"
                    class="px-2 py-1 mr-2 text-xs bg-gray-200 text-gray-700 rounded-lg"
                    >{{ gen }}</span
                  >
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm leading-5">
                {{ parsePublishedYear(book.launch_date) }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm leading-5">
                {{ book.review.rating.toFixed(1) }}/10
              </div>
            </td>
            <td class="px-6 py-4 text-sm leading-5 font-medium">
              <div>
                <a
                  v-if="book.url"
                  :href="book.url"
                  class="text-green-300 hover:text-green-400"
                  >Amazon</a
                >
              </div>
              <div>
                <a
                  v-if="book.url"
                  :href="book.url"
                  class="text-green-300 hover:text-green-400"
                  >iBooks</a
                >
              </div>
              <div>
                <a
                  v-if="book.url"
                  :href="book.url"
                  class="text-green-300 hover:text-green-400"
                  >Play Store</a
                >
              </div>
            </td>
          </tr>
          <tr :class="index % 2 === 0 ? 'bg-beige' : 'bg-white'">
            <transition name="slide-fade">
              <td
                v-if="book.showDetails"
                :colspan="columns.length"
                class="px-6 py-4"
              >
                <div class="text-sm leading-5">{{ book.synopsis }}</div>
              </td>
            </transition>
          </tr>
        </template>
      </tbody>
    </table>
    <div v-if="books.length === 0" class="px-6 py-4">
      <i class="fas fa-exclamation-triangle"></i>
      No books were found.
    </div>
  </div>
</template>

<script>
export default {
  name: "BookTable",
  props: {
    books: {
      type: Array,
    },
  },
  data() {
    return {
      columns: ["Title", "Published", "Rating", "Buy On"],
    };
  },
  methods: {
    parsePublishedYear(launchDate) {
      return new Date(launchDate).getFullYear();
    },
    getGenres(book) {
      return book.genre.split("&");
    },
    toggleDetails(book) {
      book.showDetails = !book.showDetails;
    },
  },
};
</script>

<style>
.bg-beige {
  background: rgba(245, 241, 236, 0.73);
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
