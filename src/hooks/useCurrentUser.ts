import { create } from 'zustand';

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

const useCurrentUser = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useCurrentUser;
