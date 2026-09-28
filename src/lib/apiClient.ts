import { envVar } from "@/config/envConfig";
import { ofetch } from "ofetch";

const apiClient = ofetch.create({
  baseURL: envVar.BACKEND_BASE_API_URL,
  credentials: "include",
});
export default apiClient;
