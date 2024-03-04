import { useContext } from "react";
import GruposHorariosDocentesContext from "../context/GrupoHorariosDocentesProvider";

const useGrupoHorariosDocentes = () =>
  useContext(GruposHorariosDocentesContext);
export default useGrupoHorariosDocentes;
