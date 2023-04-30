<script>
import { useSupportStore } from "@/stores/useSupport.js";
export default {
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String,
  },
  data() {
    return {
      activeItem: "",
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      polling: null,
    };
  },
  setup() {
    const storeSupport = useSupportStore();
    return { storeSupport };
  },
  mounted() {
    if (!this.storeSupport.list) {
      this.fetchFaq();
      this.pollingFaq();
    } else {
      this.loader = false;
      this.pollingFaq();
    }
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    fetchFaq() {
      this.loader = true;
      this.storeSupport.ftechFaq(this.currPage, this.per_page).then(() => {
        this.loader = false;
      });
    },
    pollingFaq() {
      this.polling = setInterval(() => {
        this.storeSupport.ftechFaq(this.currPage, this.per_page).then(() => {
          this.loader = false;
        });
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchFaq();
    },
  },
};
</script>
<template>
  <div class="app-accordion">
    <template v-if="loader">
      <TransitionGroup name="list" tag="ul">
        <li v-for="n in this.per_page" :key="n" class="item-loader">
          <Skeleton width="100%" height="14px" />
        </li>
      </TransitionGroup>
    </template>
    <template v-else>
      <TransitionGroup name="list" tag="ul">
        <li
          class="app-filter-item"
          :class="{ active: activeItem == faq.id }"
          v-for="(faq, index) in this.storeSupport.list"
          :key="index"
        >
          <div class="head" @click="activeItem = faq.id">
            <span>{{ index + 1 }}</span
            >{{ faq.title.rendered }}
          </div>
          <transition name="slidedown">
            <div class="content" v-if="this.activeItem == faq.id">
              <p v-html="faq.content.rendered"></p>
            </div>
          </transition>
        </li>
      </TransitionGroup>
    </template>
  </div>
  <EmptyContent
    title="لايوجد اى أسئلة"
    v-if="!loader && this.storeSupport.list == 0"
  />
  <div
    v-if="this.pagination && this.storeSupport.total >= 2"
    :class="this.paginClass"
  >
    <Pagination
      :totalPages="this.storeSupport.total"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>
