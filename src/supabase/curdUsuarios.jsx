import { supabase } from "../index";

export const insertarUsuarios = async (p) => {
  try {
    const { data } = await supabase.from("Usuarios").insert(p).select();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error insertando usuario", error);
  }
};
