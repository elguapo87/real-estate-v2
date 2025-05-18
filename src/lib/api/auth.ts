import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = async (formData: FormData) => {
    try {
        const { data } = await axios.post("/api/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errMessage);
    }
};

export const loginUser = async (formData: FormData) => {
    try {
        const { data } = await axios.post("/api/auth/login", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errMessage);
    }
};

export const logout = async () => {
    try {
        const { data } = await axios.post("/api/auth/logout", null, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errMessage);
        throw error;
    }
};