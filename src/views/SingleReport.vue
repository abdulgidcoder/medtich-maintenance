<script>
import { useReportsStore } from "@/stores/useReports.js";
import Details from "../components/report/single/Details.vue";
import DetailsLoader from "../components/report/single/DetailsLoader.vue";
export default {
  components: { Details,DetailsLoader },
  data() {
    return {
      reportID: this.$route.params.id,
      report_data: {},
      loader: true,
    };
  },
  setup() {
    const reportStore = useReportsStore();
    return { reportStore };
  },
  created() {},
  mounted() {
    document.title = "Report";
    if (this.reportStore.list == null) {
      this.getData();
    } else {
      this.reportStore.list.find((item) => {
        if (item.id == this.reportID) {
          this.report_data = item;
          this.loader = false; 
        } else {
          this.getData();
        }
      });
    }
  },
  methods: {
    getData() {
      this.reportStore.getReport(this.reportID).then(() => {
        this.report_data = this.reportStore.singleReport;
        setTimeout(() => {
          this.loader = false;
        }, 400);
      });
    },
  },
};
</script>
<template>
  <Page class="app-report-page">
    <Head title="Report Details" route="home"> </Head>
    <Content :isBoxed="true">
      <DetailsLoader v-if="loader"/>
      <Details v-else="loader" :details="report_data"></Details>
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
