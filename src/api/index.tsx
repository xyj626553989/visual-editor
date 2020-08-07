import axios from "@/utils/request";
interface UserInfo {
  name: string;
}
export const getUserInfo = (): Promise<UserInfo> =>
  axios
    .get<UserInfo>("/api/user", {
      params: {
        uid: "1111",
      },
    })
    .then((res) => res.data);
