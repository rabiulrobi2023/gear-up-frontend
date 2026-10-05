import { envVar } from "@/config/envConfig";
import { ofetch } from "ofetch";

const apiClient = ofetch.create({
  baseURL: envVar.BACKEND_BASE_API_URL,
  credentials: "include",

  onResponseError({ response }) {
    const data = response._data;
    throw new Error(data?.message || "Something went wrong");
  },
});
export default apiClient;
