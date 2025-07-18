import axios from "axios";
import { API_URL, apiClient } from "../client";
import { LoginResponse } from "../types/authTypes";



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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error("Unexpected login error");  
  }
}

export const verifyToken = async (
  token:string,
  // customApiClient: AxiosInstance = createApiClient()
): Promise<boolean> => {
  try {
    console.log(token);
    const response = await axios.get(`${API_URL}/auth/verify`,{
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Invalid token: ${error.message}`);
    }
    throw new Error("Unexpected token verification error");
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

