import { useState, useEffect, useRef } from "react";

function useControlValue(initialValue) {
  const [value, setValue] = useState([]);
  console.log("--------------");
  console.log(initialValue);
  console.log("--------------");
  const firstRender = useRef();

  const updateValue = (newValue, id, header) => {
    const newArray = [...value];
    newArray[id] = { ...newArray[id], [header]: newValue };

    setValue(newArray);
  };

  useEffect(() => {
    // hacer que si el length no es 0 setear el valor, modificar un ref para que no vuelva a pasar
    if (initialValue.length !== 0 && firstRender.current === undefined) {
      setValue(initialValue);
      firstRender.current = initialValue;
    }
  }, [initialValue]);

  const prevValue = firstRender.current ?? [];

  return {
    value,
    updateValue,
    prevValue,
    initialValue,
  };
}

export default useControlValue;

// var personas = [
//   { nombre: "Juan", edad: 30, trabajando: true },
//   { nombre: "María", edad: 25, trabajando: false },
//   { nombre: "Carlos", edad: 35, trabajando: true },
//   { nombre: "Ana", edad: 28, trabajando: false },
// ];
