import React from "react";

function useFormHook() {
  //     un useform que tenga, fields,
  // required
  // que tenga funcion de error, para colocar mensaje
  // hacer que los inputs tengan props de inputs normales

  const form = {
    fields: [
      {
        name: "usuario",
        required: true,
        message: "Por favor llenar campo",
        onchange: (e) => {},
        order: 2,
        type: "number",
        validate,
        storage: "local",
      },
    ],
  };

  return <div>useFormHook</div>;
}

export default useFormHook;
