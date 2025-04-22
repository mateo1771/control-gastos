import { createContext, useContext, useEffect, useState } from "react";
import { supabase, insertarUsuarios } from "../index";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session == null) {
          setUser(null);
        } else {
          setUser(session?.user.user_metadata);
          await InsertarUsuarios(session?.user.user_metadata, session?.user.id);
        }
      }
    );

    const InsertarUsuarios = async (dataProvider, idSupabase) => {
      const p = {
        Nombre: dataProvider.name,
        Foto: dataProvider.picture,
        idAuth_Supabase: idSupabase,
      };
      await insertarUsuarios(p);
    };
    return () => authListener.subscription;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
