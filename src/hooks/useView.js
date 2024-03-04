import { useContext } from "react";
import ViewContext from "../context/ViewProvider";

const useView = () => useContext(ViewContext);

export default useView;
