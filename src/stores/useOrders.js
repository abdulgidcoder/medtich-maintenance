import { defineStore } from "pinia";
import axios from "axios";
import { useAlert } from "@/stores/useAlert";
const error = useAlert();
export const useOrdersStore = defineStore("orders", {
  state: () => ({
    lastList: null,
    list: null,
    total: "",
    myList: null,
    myTotal: "",
    singleOrder: null,
  }),
  actions: {
    async ftechLast(city, per_page) {
      if (city) {
        const response = await axios({
          method: "get",
          timeout: this.$timeoutRequest,
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            city_only: city,
            per_page: per_page ? per_page : 6,
          },
        });
        if (response.data) {
          this.lastList = response.data;
        }
      }
    },
    async ftechOrders(city, currentPage, per_page) {
      if (city) {
        const response = await axios({
          method: "get",
          timeout: this.$timeoutRequest,
          url: "/wp-json/wp/v2/orders",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            city_only: city,
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 10,
          },
        });
        if (response.data) {
          this.list = response.data;
          this.total = response.headers["x-wp-totalpages"];
        }
      }
    },
    async ftechMyOrders(user, fillter_status, currentPage, per_page) {
      if (user.role == "customer") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/orders",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            status_order: fillter_status,
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 10,
            author: user.user_data.id,
          },
        });
        if (response.data) {
          this.myList = response.data;
          this.myTotal = response.headers["x-wp-totalpages"];
        }
      }
      if (user.role == "technician") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/orders",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,date,title,content,acf",
            status_order: fillter_status,
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 10,
            technician: user.user_data.id,
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
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.offers",
        },
      });

      if (responseOrder.data) {
        let newOfferID = responseOrder.data.acf.offers.length
          ? responseOrder.data.acf.offers.length + 1
          : 1;
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
        } else {
          error.masg = "لم يتم إضافة عرضك";
          error.style = "danger";
          error.show = true;
        }
      }
    },
    async getOrder(id) {
      const response = await axios({
        method: "get",
        timeout: this.$timeoutRequest,
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
    async addOrder(order) {
      const response = await axios({
        method: "post",
        url: "wp-json/wp/v2/orders",
        params: {
          _fields: "id,title",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          status: "publish",
          title: order.title,
          content: order.content,
          fields: {
            city: order.city,
            email: order.email,
            region: order.region,
            serial_number: order.serial_number,
            company: order.company,
            latitude: order.location.latitude,
            longitude: order.location.longitude,
            mobile: order.mobile,
            name: order.name,
            payment_gateway: order.payment_gateway,
            status: "active",
            technician: false,
            set_paid: false,
            offers: false,
          },
        },
      });
    },
    async acceptOffer(userID, orderId) {
      const responseOrder = await axios({
        method: "get",
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.technician",
        },
      });
      if (!responseOrder.data.acf.technician) {
        const response = await axios({
          method: "post",
          url: "/wp-json/wp/v2/orders/" + orderId,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "acf.technician",
          },
          data: {
            fields: { technician: userID },
          },
        });
        if (response.data.acf.technician == userID) {
          error.masg = "تم قبول العرض";
          error.style = "success";
          error.show = true;
        } else {
          error.masg = "لم يتم قبول العرض";
          error.style = "danger";
          error.show = true;
        }
      }
    },
    async checkout(orderId) {
      const response = await axios({
        method: "post",
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.set_paid",
        },
        data: {
          fields: { set_paid: true },
        },
      });
      if (response.data.acf.set_paid) {
        error.masg = "سيتم مراجعة التحويل";
        error.style = "success";
        error.show = true;
      }
    },
    async TechArrived(orderId, arrived) {
      const response = await axios({
        method: "post",
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.technician_arrived",
        },
        data: {
          fields: {
            technician_arrived: {
              date: arrived.date,
              location: {
                lat: arrived.location.latitude,
                lng: arrived.location.longitude,
              },
            },
          },
        },
      });
      if (response.data.acf.technician_arrived) {
        error.masg = "تم تسجيل وصولك بنجاح";
        error.style = "success";
        error.show = true;
      }
    },
    async confirmTechArrived(orderId, confirm_arrived) {
      const response = await axios({
        method: "post",
        url: "/wp-json/wp/v2/orders/" + orderId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "acf.confirm_technician_arrived",
        },
        data: {
          fields: {
            confirm_technician_arrived: confirm_arrived,
          },
        },
      });
      if (response.data.acf.confirm_technician_arrived) {
        error.masg = "تم تاكيد وصول الفنى";
        error.style = "success";
        error.show = true;
      }
    },
    async addReport(orderId, report) {
      const response = await axios({
        method: "post",
        url: "/wp-json/wp/v2/orders/" + orderId,
        params: {
          _fields: "id,date,modified,title,content,acf,author",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          fields: {
            report: {
              needs_replacement_parts: report.replacement_parts,
              date: report.date,
              expected_cost: report.expected_cost,
              expected_time: report.expected_time,
              technical: report.technical,
              details: report.details,
              images: report.images,
            },
          },
        },
      }).then((response) => {
        console.log(response);
      });
    },
  },
});
