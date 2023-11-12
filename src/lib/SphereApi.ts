import axios from "axios";
import { config } from "dotenv";
config();

const SphereApi = axios.create({
  baseURL: process.env.SPHERE_URL,
});

if (process.env.SPHERE_TOKEN) {
  SphereApi.defaults.params = {
    access_token: process.env.SPHERE_TOKEN,
  };
}
export default SphereApi;
