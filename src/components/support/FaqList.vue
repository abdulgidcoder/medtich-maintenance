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
      activeIteme: 1,
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      polling: null,
    };
  },
  setup() {
    const storeSupport = useSupportStore();
    return { storeSupport };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    if (!this.storeSupport.list) {
      this.fetchFaq();
      this.pollingFaq();
    } else {
      this.loader = false;
      this.pollingFaq();
    }
  },
  methods: {
    fetchFaq() {
      this.loader = true;
      this.storeSupport.ftechFaq(this.currPage, this.per_page).then(() => {
        setTimeout(() => {
          this.loader = false;
        }, 400);
      });
    },
    pollingFaq() {
      this.polling = setInterval(() => {
        this.storeSupport.ftechFaq(this.currPage, this.per_page).then(() => {
          setTimeout(() => {
            this.loader = false;
          }, 400);
        });
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchFaq();
    },
    fillterbyStatus(status, ele) {
      this.status = status;
      this.currPage = 1;
      this.fetchFaq();
    },
  },
};
</script>
<template>
  <div class="app-accordion">
    <div class="app-filter-items">
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
            :class="{ active: activeIteme == faq.id }"
            @click="this.activeIteme = faq.id"
            v-for="(faq, index) in this.storeSupport.list"
            :key="index"
          >
            <div class="head">
              <a href="#">
                <span>{{ index + 1 }}</span
                >{{ faq.title.rendered }}</a
              >
            </div>
            <transition name="slidedown">
              <div class="content" v-if="this.activeIteme == faq.id">
                <p v-html="faq.title.rendered"></p>
              </div>
            </transition>
          </li>
        </TransitionGroup>
      </template>
    </div>
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

<style lang="scss"></style>
