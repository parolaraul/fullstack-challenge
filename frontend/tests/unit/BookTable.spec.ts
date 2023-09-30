import { shallowMount } from "@vue/test-utils";
import BookTable from "@/components/BookTable.vue";

describe("BookTable", () => {
  it("renders properly with books", () => {
    const books = [
      {
        id: 1,
        title: "Book 1",
        launch_date: "2023-09-30",
        review: { rating: 8.5 },
        url: "https://book.com",
        genre: "Fiction & Adventure",
        cover: { url: "cover1.jpg" },
        explicit_content: false,
        synopsis: "Synopsis for Book 1",
        showDetails: false,
      },
    ];

    const wrapper = shallowMount(BookTable, {
      props: {
        books,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders properly without books", () => {
    const books: any[] = [];

    const wrapper = shallowMount(BookTable, {
      props: {
        books,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toContain("No books were found.");
  });

  it("toggles details", async () => {
    const books = [
      {
        id: 1,
        title: "Book 1",
        launch_date: "2023-09-30",
        review: { rating: 8.5 },
        url: "https://example.com",
        genre: "Fiction&Adventure",
        cover: { url: "cover1.jpg" },
        explicit_content: false,
        synopsis: "Synopsis for Book 1",
        showDetails: false,
      },
    ];

    const wrapper = shallowMount(BookTable, {
      props: {
        books,
      },
    });

    const toggleButton = await wrapper.find("#book-0");

    expect(wrapper.vm.books).toBeDefined();
    if (wrapper.vm.books && wrapper.vm.books[0]) {
      const wrapperBooks: any = wrapper.vm.books[0];
      await toggleButton.trigger("click");
      expect(wrapperBooks.showDetails).toBe(true);

      await toggleButton.trigger("click");
      expect(wrapperBooks.showDetails).toBe(false);
    }
  });
});
