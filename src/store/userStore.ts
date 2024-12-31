import { create } from "zustand";

interface UserState {
  id?: string | null;
  image?: string | null;
  name: string | null;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  id: null,
  image: null,
  name: null,
  setUser: (user) => set(() => ({ ...user })),
  clearUser: () =>
    set({
      id: null,
      name: null,
      image: null,
    }),
}));

export default useUserStore;
