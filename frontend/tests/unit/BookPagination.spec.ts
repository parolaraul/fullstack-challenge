import { shallowMount } from "@vue/test-utils";
import BookPagination from "@/components/BookPagination.vue";

describe("BookPagination", () => {
  it("renders pagination properly", () => {
    const currentPage = 1;
    const totalPages = 2;

    const wrapper = shallowMount(BookPagination, {
      props: {
        currentPage,
        totalPages,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toContain(`Page ${currentPage} of ${totalPages}`);
  });

  it("disables the previous button on the first page", async () => {
    const currentPage = 1;
    const totalPages = 2;

    const wrapper = shallowMount(BookPagination, {
      props: {
        currentPage,
        totalPages,
      },
    });

    const prevButton = wrapper.find("#prev-button");
    const nextButton = wrapper.find("#next-button");

    expect(prevButton.element.hasAttribute("disabled")).toBe(true);
    expect(nextButton.element.hasAttribute("disabled")).toBe(false);
  });

  it("disables the next button on the last page", async () => {
    const currentPage = 2;
    const totalPages = 2;

    const wrapper = shallowMount(BookPagination, {
      props: {
        currentPage,
        totalPages,
      },
    });

    const prevButton = wrapper.find("#prev-button");
    const nextButton = wrapper.find("#next-button");

    expect(prevButton.element.hasAttribute("disabled")).toBe(false);
    expect(nextButton.element.hasAttribute("disabled")).toBe(true);
  });

  it("emits page-change event when clicking next and previous buttons", async () => {
    const currentPage = 10;
    const totalPages = 30;

    const wrapper = shallowMount(BookPagination, {
      props: {
        currentPage,
        totalPages,
      },
    });

    const prevButton = wrapper.find("#prev-button");
    const nextButton = wrapper.find("#next-button");

    await nextButton.trigger("click");
    await prevButton.trigger("click");

    expect(wrapper.emitted("page-change")).toHaveLength(2);
    if (wrapper.emitted("page-change")) {
      expect(wrapper.emitted("page-change")![0]).toEqual([currentPage + 1]);
      expect(wrapper.emitted("page-change")![1]).toEqual([currentPage - 1]);
    }
  });
});
