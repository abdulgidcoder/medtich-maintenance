import { defineStore } from "pinia";
import axios from "axios";
export const useReportsStore = defineStore("reports", {
  state: () => ({
    list: null,
    singleReport: null,
    total: "",
  }),
  actions: {
    async ftechallReports(userID, currentPage, per_page, fillter_status) {
      const response = await axios({
        method: "get",
        timeout: this.$timeoutRequest,
        url: "wp-json/wp/v2/report",
        params: {
          _fields: "id,date,modified,title,content,acf,author",
          author: userID,
          page: currentPage,
          orderby: "modified",
          per_page: per_page,
          status_report: fillter_status,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        this.list = response.data;
        this.total = response.headers["x-wp-totalpages"];
      });
    },
    async addReport(report) {
      const response = await axios({
        method: "post",
        url: "wp-json/wp/v2/report",
        params: {
          _fields: "id,date,modified,title,content,acf,author",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          status: "publish",
          title: report.title,
          content: report.content,
          fields: {
            status: "pending",
            replacement_parts: report.replacement_parts,
            expected_time: report.expected_time,
            expected_cost: report.expected_cost,
            image: report.images,
            order: report.order,
          },
        },
      }).then((response) => {
        // this.list.push(response.data);
      });
    },
    async getReport(id) {
      const response = await axios({
        method: "get",
        timeout: 5000,
        url: "/wp-json/wp/v2/report/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,modified,title,content,acf",
        },
      });
      if (response.data) {
        this.singleReport = response.data;
      }
    },
  },
});
