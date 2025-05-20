import axios, { AxiosInstance } from "axios";
import { apiClient } from "../client";
import { LoginResponse } from "../types/authTypes";

interface VerifyTokenResponse {
  valid: boolean;
}

export const login = async (
  email: string,
  password: string,
  // customApiClient: AxiosInstance = createApiClient()
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    // Cookie avtomatik saqlanadi, tokenni alohida saqlash shart emas
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Login failed";
      if (status === 401) {
        throw new Error("Invalid email or password");
      } else if (status === 429) {
        throw new Error("Too many login attempts. Please try again later.");
      }
      throw new Error(`Login failed: ${message} (Status: ${status})`);
    } else if (error.request) {
      throw new Error("Network error: Unable to reach the server.");
    }
    throw new Error(
      error instanceof Error ? error.message : "Unexpected login error"
    );
  }
};
export const verifyToken = async (
  token:string,
  // customApiClient: AxiosInstance = createApiClient()
): Promise<boolean> => {
  try {
    console.log(token);
    const response = await axios.get("http://localhost:5000/api/auth/verify",{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    if (typeof response.data.valid !== "boolean") {
      throw new Error("Invalid verify response: 'valid' field missing or not a boolean");
    }
    return response.data.valid;
  } catch (error: any) {
    console.log("Invalid token:",error);
    return false;
  }
};
// export const logOut = async (
//   customApiClient: AxiosInstance = createApiClient()
// ) => {
//   try {
//     const response = await customApiClient.post("/auth/logout");
//     return response.data;
//   } catch (error: any) {
//     console.log("Invalid token:", error);
//     return false;
//   }
// }

