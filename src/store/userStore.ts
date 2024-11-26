import { create } from "zustand";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  id: null,
  name: null,
  email: null,
  image: null,
  setUser: (user) => set(() => ({ ...user })),
  clearUser: () =>
    set({
      id: null,
      name: null,
      email: null,
      image: null,
    }),
}));

export default useUserStore;
