import axios from "axios";
import { config } from "../config";

export const getRequest = async <T>(endpoint: string, params?: Record<string, string | number>): Promise<T> => {
    console.log(import.meta.env)
    try {
        const response = await axios.get<T>(`${config.API_URL}/${endpoint}`, {
            params
        });
        return response.data;
    } catch (error) {
        console.error("Error making GET request:", error);
        throw error;
    }
};

export const postRequest = async <T>(endpoint: string, data: unknown): Promise<T> => {
    try {
        const response = await axios.post<T>(`${config.API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error("Error making POST request:", error);
        throw error;
    }
};

export default {
    getRequest,
    postRequest
};
