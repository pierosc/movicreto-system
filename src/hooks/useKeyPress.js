import { useEffect, useRef } from "react";

const useKeyPress = (targetKey, callback) => {
  const keyDownRef = useRef(false);

  const handleKeyDown = (event) => {
    if (event.key === targetKey && !keyDownRef.current) {
      keyDownRef.current = true;
      callback();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === targetKey) {
      keyDownRef.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;

// El valor de targetKey en la función useKeyPress puede ser cualquier cadena que represente una tecla en particular. Puedes utilizar los nombres de las teclas, los códigos de teclas o las teclas especiales. Algunos ejemplos comunes incluyen:

// Nombres de teclas:
// 'Enter': Representa la tecla "Enter".
// 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown': Representan las teclas de flecha.

// Códigos de teclas:
// 'KeyA', 'KeyB', ..., 'KeyZ': Representan las teclas alfabéticas.
// 'Digit0', 'Digit1', ..., 'Digit9': Representan las teclas numéricas.

// Teclas especiales:
// 'Shift', 'Control', 'Alt': Representan las teclas modificadoras.
// 'Space': Representa la barra espaciadora.
// 'Tab': Representa la tecla Tab.
