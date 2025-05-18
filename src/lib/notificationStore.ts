import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface NotificationStore {
  number: number;
  fetch: () => Promise<void>;
  decrease: () => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  number: 0,

  fetch: async () => {
    try {
      const { data } = await axios.get("/api/users/getNotification");
      if (data.success) {
        set({ number: data.number });

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Failed to fetch notification", error);
    }
  },

  decrease: () => {
    set((state) => ({ number: Math.max(state.number - 1, 0) }));
  },

  reset: () => {
    set({ number: 0 });
  }
}));