import { defineStore } from "pinia";
import axios from "axios";
export const useOrdesStore = defineStore("orders", {
  state: () => ({
    list: null,
    total: "", 
  }),
  actions: {
    async ftechOrders(area, currentPage, per_page) {
      if (area) {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            orderby: "modified",
            area: area,
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 5,
          },
        });
        if (response.data) {
          this.list = response.data;
          this.total = response.headers["x-wp-totalpages"];
        }
      }
    },
  },
});
