import { create } from 'zustand';

interface Users {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface UserStore {
    users: Users[] | null;
    setUsers: (user: Users[] | null) => void;
}

const useAllUsers = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));

export default useAllUsers;
