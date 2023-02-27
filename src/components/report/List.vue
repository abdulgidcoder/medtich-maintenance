<script>
import { useReportsStore } from "@/stores/useReports.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";

export default {
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
    };
  },
  setup() {
    const reportStore = useReportsStore();
    return { reportStore };
  },
  mounted() {
    this.getreports();
  },
  methods: {},
  components: { Item, ItemLoader },
  methods: {
    getreports() {
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
    onPageChange(page) {
      this.currPage = page;
      this.getreports();
    },
    fillterbyStatus(status, ele) {
      this.status = status;
      this.getreports();
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
    <ul>
      <ItemLoader v-if="loader" v-for="n in this.per_page" :key="n" />
      <Item
        v-else="!loader"
        v-for="report in this.reportStore.list"
        :key="report.id"
        :report="report"
      ></Item>
      <Info
        mode="warning"
        msg="ليس لديك اى تقارير"
        :show="this.reportStore.list == 0"
        v-if="!loader"
      />
    </ul>
  </div>
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
