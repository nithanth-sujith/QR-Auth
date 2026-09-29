import axios from "axios";

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const refreshApi = axios.create({
  baseURL: "http://192.168.1.9:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function refreshAccessToken(refreshToken: string) {
  const response = await refreshApi.post<RefreshTokenResponse>(
    "/auth/refresh",
    {
      refreshToken,
    },
  );

  return response.data;
}
