import { defineStore } from "pinia";
import axios from "axios";
import { useError } from "@/stores/useError";
const error = useError();

export const useOrdesStore = defineStore("orders", {
  state: () => ({
    list: null,
    total: "",
    myList: null,
    myTotal: "",
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
            area_only: area,
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
    async ftechMyOrders(technician, currentPage, per_page) {
      if (technician) {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            orderby: "modified",
            technician: technician,
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 5,
          },
        });
        if (response.data) {
          this.myList = response.data;
          this.myTotal = response.headers["x-wp-totalpages"];
        }
      }
    },
    async acceptOrders(id, technician) {
      const responseOrder = await axios({
        method: "get",
        url: "/wp-json/wp/v2/orders/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          technician: technician,
        },
      });
      if (responseOrder.data.acf["technician"]) {
        error.masg = "have user Accepted";
        error.style = "warning";
        error.show = true;
      } else {
        const responseAcc = await axios({
          method: "post",
          url: "/wp-json/wp/v2/orders/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            fields: {
              technician: technician,
            },
          },
        });
        if (responseAcc.data.acf["technician"]) {
          error.masg = "Order Accept Success";
          error.style = "success";
          error.show = true;
        }
      }
    },
  },
});
