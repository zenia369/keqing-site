//to-do rename variables - broken shift key
import axios from "axios";
import KCookie from "@Lib/k-cookie";

const origin = `${window.location.origin}/api/`;

const headers = { "CSRF-Token": KCookie.get("XSRF-TOKEN") };

const KFetch = axios.create({
  baseURL: origin,
  headers,
});

export default KFetch;
