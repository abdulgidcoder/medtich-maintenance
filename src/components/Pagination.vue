<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: String,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup() {},
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage == this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<template>
  <nav class="p-1" v-if="totalPages >= 2">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: isInFirstPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="onClickPreviousPage"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        :class="{ active: isPageActive(page.name) }"
        v-for="page in pages"
        :key="page.name"
      >
        <a class="page-link" href="#" @click.prevent="onClickPage(page.name)">{{
          page.name
        }}</a>
      </li>

      <li class="page-item" :class="{ disabled: isInLastPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="onClickNextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
.pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-link {
  position: relative;
  display: block;
  margin-left: -1px;
  color: var(--primary);
  background-color: #fff;
  border: 1px solid var(--light);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.page-link:focus {
  z-index: 3;
  outline: 0;
  box-shadow: 0 0 0 0.2rem var(--primary-shade);
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.page-item:last-child .page-link {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}

.page-item.disabled .page-link {
  color: var(--medium);
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>
