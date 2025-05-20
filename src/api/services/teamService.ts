import { AxiosInstance } from "axios";
import { createApiClient } from "../client"; // Import the factory function
import type { Team } from "../types/teamTypes";

const defaultApiClient = createApiClient();

export const getTeam = async (
    locale: string,
    customApiClient: AxiosInstance = defaultApiClient // Optional custom client
): Promise<{ teams: Team[]; total: number }> => {
    const response = await customApiClient.get<{ teams: Team[]; total: number }>("/team", {
        params: { locale },
    });
    return response.data;
};
