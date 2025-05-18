"use client"

import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { deletePost, getUserSavedPosts, savePost } from "@/lib/api/actions";


interface UserDataType {
    id: number;
    userName: string;
    email: string;
    avatar: string | null;
    token: string;
}

type PostDetailType = {
    desc?: string;
    utilities?: string;
    pet?: string;
    income?: string;
    size?: number;
    school?: number;
    bus?: number;
    restaurant?: number;
};

type ImageType = {
    id: number;
    url: string;
};

type UserPostDataType = {
    avatar?: string
    email?: string;
    id?: number;
    userName?: string
};

type PostDataType = {
    id: number;
    title: string;
    images: ImageType[];
    bedroom: number;
    bathroom: number;
    price: number;
    property: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    postDetail: PostDetailType[];
    user: UserPostDataType;
    type: string
};

type SearchFilterType = {
    city: string;
    type: string[];
    property: string[];
    price: {
        minPrice: number,
        maxPrice: number
    },
    bedroom: number;
};

type SavedPost = {
    postId: number;
};

interface AuthContextType {
    userData: UserDataType | null;
    setUserData: Dispatch<SetStateAction<UserDataType | null>>;
    fetchUserData: () => Promise<void>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    posts: PostDataType[] | null;
    setPosts: Dispatch<SetStateAction<PostDataType[] | null>>;
    fetchPosts: () => Promise<void>;
    searchFilter: SearchFilterType;
    setSearchFilter: Dispatch<SetStateAction<SearchFilterType>>;
    isSearched: boolean;
    setIsSearched: Dispatch<SetStateAction<boolean>>;
    filteredPosts: PostDataType[] | null;
    setFilteredPosts: Dispatch<SetStateAction<PostDataType[] | null>>;
    handleSavePost: (postId: number) => Promise<void>;
    savedPostIds: number[];
    setSavedPostIds: Dispatch<SetStateAction<number[]>>
    fetchSavedPosts: () => Promise<void>;
    handleDeletePost: (postId: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userData, setUserData] = useState<UserDataType | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [posts, setPosts] = useState<PostDataType[] | null>(null);

    const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
        city: "",
        type: [],
        property: [],
        price: {
            minPrice: 0,
            maxPrice: 0
        },
        bedroom: 0
    });

    const [isSearched, setIsSearched] = useState<boolean>(false);

    const [filteredPosts, setFilteredPosts] = useState<PostDataType[] | null>(posts);

    const [savedPostIds, setSavedPostIds] = useState<number[]>([]);

    const fetchUserData = async () => {
        try {
            const { data } = await axios.get("/api/users/getUser");
            if (data.success) {
                setUserData(data.user);

            } else {
                if (data.message === "Unauthorized" || data.message === "Invalid Token" || data.message === "User not found") {
                    setUserData(null);
                    return;
                }
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast.error(errMessage);

        } finally {
            setIsLoading(false);
        }
    }

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get("/api/posts/getPosts");
            if (data.success) {
                setPosts(data.posts);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };


    const handleSavePost = async (postId: number) => {
        const isAlreadySaved = savedPostIds.includes(postId);
        const updatedSavedPostIds = isAlreadySaved ? savedPostIds.filter((id) => id !== postId) : [...savedPostIds, postId];

        setSavedPostIds(updatedSavedPostIds);

        const formData = new FormData();
        formData.append("postId", postId.toString());

        try {
            const data = await savePost(formData);

            if (!data.success) {
                setSavedPostIds((prev) => isAlreadySaved ? [...prev, postId] : prev.filter((id) => id !== postId));
                toast.error(data.message);

            } else {
                toast.success(data.message);
            }

        } catch (error) {
            setSavedPostIds((prev) => isAlreadySaved ? [...prev, postId] : prev.filter((id) => id !== postId));
            const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast.error(errMessage);
        }
    };

    
    const fetchSavedPosts = useCallback(async () => {
        if (!userData) return;
    
        try {
            const data = await getUserSavedPosts();
            if (data.success) {
                const savedIds = data.userSavedPosts.map((post: SavedPost) => post.postId);
                setSavedPostIds(savedIds);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast.error(errMessage);
        }
    }, [userData]);

    const handleDeletePost = async (postId: number) => {
        const isConfirm = window.confirm("Are you sure you want to delete this post?")

        if (!isConfirm) return;

        const formData = new FormData();
        formData.append("postId", postId.toString());

        try {
            const data = await deletePost(formData);
            if (data.success) {
                toast.success(data.message);
                await fetchPosts();

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };


    useEffect(() => {
        fetchUserData();
        fetchPosts();
    }, []);


    useEffect(() => {
        if (userData) {
            fetchSavedPosts();
        }
    }, [userData, fetchSavedPosts]);

    const value = {
        userData, setUserData,
        fetchUserData,
        isOpen, setIsOpen,
        isLoading, setIsLoading,
        posts, setPosts,
        fetchPosts,
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        filteredPosts, setFilteredPosts,
        handleSavePost,
        fetchSavedPosts,
        savedPostIds, setSavedPostIds,
        handleDeletePost,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export type { PostDataType };

export default AuthContextProvider;