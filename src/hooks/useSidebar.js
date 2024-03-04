import { useContext } from "react";
import SidebarContext from "../context/SidebarProvider";

const useGrupoHorariosDocentes = () => useContext(SidebarContext);
export default useGrupoHorariosDocentes;
