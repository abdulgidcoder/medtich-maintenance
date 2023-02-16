import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = "https://maintenance.medtich.com";

let refresh = false;

// axios.interceptors.response.use(
//   (resp) => resp,
//   (error) => {
//     console.log(error.code === "ERR_NETWORK");
//       console.log(error);
//     // const router = use  console.log(error.code === "ERR_NETWORK");Router();
//     if(error.code === "ERR_NETWORK"){
//       // this.$router.push('/');
//       // this.router.push("/");
//       // router.push("/"); 
//     }
//     // if (error.response.status === 401 && !refresh) {
//     //   refresh = true;
//     //   const { status, response } = await axios({
//     //     method: "post",
//     //     url: "",
//     //     params: {
//     //       rest_route: "/auth/auth/refresh",
//     //       AUTH_KEY: "xjKnJXXB(ML`3B!V4Me/R5F=GEp0cKAt!",
//     //       JWT: localStorage.getItem("token"),
//     //     },
//     //   });
//     //   if (status === 200) {
//     //     const token = `${response.data.data.jwt}`;
//     //     localStorage.setItem("token", token);
//     //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     //     return axios(error.config);
//     //   }
//     // }
//     // refresh = false;
//     // return error;
//   }
// );
