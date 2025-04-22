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
          // insertarUsuarios(session?.user_metadata, session.user.id)
          console.log("event", event);
          console.log("session", session?.user);
        }
      }
    );
    return () => authListener.subscription;
  }, []);

  // const insertarUsuarios = async (dataProvider, IdAuth_Supabase) => {
  //   const p = {
  //     nombres: dataProvider.name,
  //     foto: dataProvider.picture,
  //     IdAuth_Supabase: IdAuth_Supabase,
  //   };
  //   await insertarUsuarios(p){

  //   }
  // };
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
