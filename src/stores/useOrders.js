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
          timeout: 5000,
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,acf.offers,acf.status",
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
          timeout: 5000,
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,acf.offers,acf.status",
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
    async ftechMyOrders(technician, currentPage, per_page, fillter_status) {
      if (technician) {
        const response = await axios({
          method: "get",
          timeout: 5000,
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            technician: technician,
            status_order: fillter_status,
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
    async addOffer(offer, orderId) {
      let offers = [];
      let newOffer = {
        id: "",
        date: offer.date,
        technical: offer.technical,
        price: offer.price,
        details: offer.details,
      };
      const responseOrder = await axios({
        method: "get",
        timeout: 5000,
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.offers",
        },
      });

      if (responseOrder.data) {
        let newOfferID = responseOrder.data.acf.offers.length + 1;
        newOffer.id = newOfferID;
        if (Array.isArray(responseOrder.data.acf.offers)) {
          responseOrder.data.acf.offers.forEach((item) => {
            let oldOffer = {
              id: item.id,
              date: item.date,
              technical: item.technical.ID,
              price: item.price,
              details: item.details,
            };
            offers.push(oldOffer);
          });
          offers.push(newOffer);
        } else {
          offers.push(newOffer);
        }
        const responseAddOffer = await axios({
          method: "post",
          url: "/wp-json/wp/v2/orders/" + orderId,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            fields: { offers: offers },
          },
        });
        if (responseAddOffer.data.acf.offers) {
          error.masg = "تم إضافة عرضك";
          error.style = "success";
          error.show = true;
        }
      }
    },
    async getOrder(id) {
      const response = await axios({
        method: "get",
        timeout: 5000,
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
