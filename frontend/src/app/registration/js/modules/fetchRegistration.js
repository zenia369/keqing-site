import state from "./state";
import KFetch from "@Lib/k-fetch";

export default async () => {
  const { data } = await KFetch.post("auth/registration" + state.newUrl);

  const { uid, ...response } = data;

  if (!uid) throw Error(response.message);

  return uid;
};
