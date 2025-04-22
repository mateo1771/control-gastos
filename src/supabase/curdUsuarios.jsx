import { supabase } from "../index";

export const insertarUsuarios = async (p) => {
  try {
    const { data } = await supabase.from("Usuarios").insert(p).select();
    return data;
  } catch (error) {
    console.log(error);
  }
};
