<script>
import { useReportsStore } from "@/stores/useReports.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";

export default {
  components: { Item, ItemLoader },
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String,
  },
  data() {
    return {
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      status: "",
      polling: null,
    };
  },
  setup() {
    const reportStore = useReportsStore();
    return { reportStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    if (!this.reportStore.list) {
      this.fetchReports();
      this.pollingReports();
    } else {
      this.loader = false;
      this.pollingReports();
    }
  },
  methods: {
    fetchReports() {
      this.loader = true;
      this.reportStore
        .ftechallReports(
          this.$auth.user_data.id,
          this.currPage,
          this.per_page,
          this.status
        )
        .then(() => {
          setTimeout(() => {
            this.loader = false;
          }, 400);
        });
    },
    pollingReports() {
      this.polling = setInterval(() => {
        this.reportStore
          .ftechallReports(
            this.$auth.user_data.id,
            this.currPage,
            this.per_page,
            this.status
          )
          .then(() => {
            setTimeout(() => {
              this.loader = false;
            }, 100);
          });
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchReports();
    },
    fillterbyStatus(status, ele) {
      this.status = status;
      this.currPage = 1;
      this.fetchReports();
    },
  },
};
</script>

<template>
  <div class="reports-list">
    <div class="app-fillter">
      <button
        :class="{ active: status == '' }"
        @click="fillterbyStatus('', $event.target)"
      >
        الكل
      </button>
      <button
        :class="{ active: status == 'active' }"
        @click="fillterbyStatus('active', $event.target)"
      >
        نشط
      </button>
      <button
        :class="{ active: status == 'pending' }"
        @click="fillterbyStatus('pending', $event.target)"
      >
        قيد الانتظار
      </button>
      <button
        :class="{ active: status == 'block' }"
        @click="fillterbyStatus('block', $event.target)"
      >
        مرفوض
      </button>
    </div>
    <ul v-if="loader">
      <ItemLoader v-for="n in this.per_page" :key="n" />
    </ul>
    <ul v-else>
      <Item
        v-for="report in this.reportStore.list"
        :key="report.id"
        :report="report"
      ></Item>
    </ul>
  </div>
  <EmptyContent
    title="لايوجد اى تقارير"
    v-if="!loader && this.reportStore.list == 0"
  />
  <div
    v-if="this.pagination && this.reportStore.total >= 2"
    :class="this.paginClass"
  >
    <Pagination
      :totalPages="this.reportStore.total"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>
