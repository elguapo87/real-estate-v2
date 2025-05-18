import axios from "axios";

export const updateUser = async (formData: FormData) => {
    try {
        const { data } = await axios.put("/api/users/updateUser", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update user");
    }
};

export const getUsers = async () => {
    try {
        const { data } = await axios.get("/api/users/getUsers");

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch users");
    }
};


export const addPost = async (formData: FormData) => {
    try {
        const { data } = await axios.post("/api/posts/addPost", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to add post");
    }
};


export const getPost = async (postId: number) => {
    try {
        const { data } = await axios.get(`/api/posts/getPost?postId=${postId}`);

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch post");
    }
};

export const updatePost = async (formData: FormData) => {
    try {
        const { data } = await axios.put("/api/posts/updatePost", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update post");
    }
};

export const savePost = async (formData: FormData) => {
    try {
        const { data } = await axios.post("/api/users/savePost", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to save post");
    }
};

export const getUserSavedPosts = async () => {
    try {
        const { data } = await axios.get("/api/users/getSavedPosts", {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to get saved posts");
    }
};

export const deletePost = async (formData: FormData) => {
    try {
        const { data } = await axios.delete("/api/posts/deletePost", {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to delete post");
    }
};