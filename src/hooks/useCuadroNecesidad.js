import { useContext } from "react";
import CuadroNecesidadContext from "../context/CuadroNecesidadProvider";

const useCuadroNecesidad = () => useContext(CuadroNecesidadContext);
export default useCuadroNecesidad;
