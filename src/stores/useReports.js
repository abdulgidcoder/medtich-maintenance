import { defineStore } from "pinia";
import axios from "axios";
export const useReportsStore = defineStore("reports", {
  state: () => ({
    allReports: [],
    totalPages: "",
  }),
  actions: { 
    async ftechallReports(userID, currentPage, per_page, fillter_status) {
      const response = await axios({
        method: "get",
        url: "wp-json/wp/v2/report",
        params: {
          _fields: "id,date,title,content,acf,author",
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
        this.allReports = response.data;
        this.totalPages = response.headers["x-wp-totalpages"];
      });
    },
    async addReport(report) {
      const response = await axios({
        method: "post",
        url: "wp-json/wp/v2/report",
        params: {
          _fields: "id,date,title,content,acf,author",
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
          },
        },
      }).then((response) => {
        this.allReports.push(response.data);
      });
    },
  },
});
