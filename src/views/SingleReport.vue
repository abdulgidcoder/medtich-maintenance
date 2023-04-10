<script>
import { useReportsStore } from "@/stores/useReports.js";
import Details from "../components/report/single/Details.vue";
import DetailsLoader from "../components/report/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      reportID: this.$route.params.id,
      report_data: [],
      loader: true,
      polling: null,
    };
  },
  setup() {
    const reportStore = useReportsStore();
    return { reportStore };
  },
  beforeUnmount() {
    // clearInterval(this.polling);
    this.reportStore.$patch({
      singleReport: null,
    });
  },
  created() {
    document.title = "Report";
    if (this.reportStore.list == null) {
      this.fetchReport();
    } else {
      this.reportStore.list.find((item) => {
        if (item.id == this.reportID) {
          this.report_data = item;
          this.loader = false;
        } else {
          this.fetchReport();
        }
      });
    }
    // this.pollingReport();
  },
  methods: {
    fetchReport() {
      this.reportStore.getReport(this.reportID).then(() => {
         this.report_data = this.reportStore.singleReport;
        setTimeout(() => {
          this.loader = false;
        }, 400);
      });
    },
    pollingReport() {
      this.polling = setInterval(() => {
        this.reportStore.getReport(this.reportID);
      }, this.pollTimer);
    },
  },
};
</script>
<template>
  <Page class="app-report-page">
    <Head title="تفاصيل التقرير" goBack="true"> </Head>
    <Content :isBoxed="true">
      <DetailsLoader v-if="loader" />
      <Details v-else :details="report_data"></Details>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-report-page {
  .app-content {
    padding-bottom: 0;
  }
}
</style>
