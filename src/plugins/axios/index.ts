import axios from "axios";
import config from "@/configs/axios";
import interceptors from "./interceptors";

const instance = axios.create(config);

interceptors(instance);

export default instance;
