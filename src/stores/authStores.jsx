import { create } from "zustand";
import { supabase } from "../index";
export const useAuthStore = create((set) => ({
  isAuth: false,
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("ha ocurrido un error durante la autenticacion");
      set({ isAuth: true });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    set({ isAuth: false });
    if (error)
      throw new Error("ha ocurrido un error durante el cierre de session");
  },
}));
