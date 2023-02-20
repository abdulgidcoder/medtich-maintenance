import { defineStore } from "pinia";
import axios from "axios";
import { useError } from "@/stores/useError";
const error = useError();

export const useOrdesStore = defineStore("orders", {
  state: () => ({
    lastList: null,
    list: null,
    total: "",
    myList: null,
    myTotal: "",
    singleOrder: null,
  }),
  actions: {
    async ftechLast(area, per_page) {
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
            per_page: per_page ? per_page : 5,
          },
        });
        if (response.data) {
          this.lastList = response.data;
        }
      }
    },
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
    async acceptOrders(order, technician) {
      console.log();
      const responseOrder = await axios({
        method: "get",
        url: "/wp-json/wp/v2/orders/" + order.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          email: order.acf?.email,
          mobile: order.acf?.mobile,
          area: order.acf?.area,
          date: order.acf?.date,
          serial_number: order.acf?.serial_number,
          company: order.acf?.company,
          latitude: order.acf?.latitude,
          longitude: order.acf?.longitude,
          name: order.acf?.name,
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
    async getOrder(id) {
      const response = await axios({
        method: "get",
        url: "/wp-json/wp/v2/orders/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,title,content,acf",
        },
      });
      if (response.data) {
        this.singleOrder = response.data;
      }
    },
  },
});
