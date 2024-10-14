import { set } from 'idb-keyval';
import React, { useState, useEffect } from 'react';

const phrases = [
  "Busca, por puesto!",
  "Desarrollador Web",
  "Busca, por lugar!",
  "Canelones",
  "Busca, combinado!",
  "Electricista Artigas",
];

export const SearchBox = ({ searchTerm, setSearchTerm }) => {

 // Texto que se va a mostrar en el placeholder
 const [displayText, setDisplayText] = useState("");
 // Índice del carácter actual de la frase
 const [index, setIndex] = useState(0);
 // Flag que indica si se está borrando el texto
 const [isDeleting, setIsDeleting] = useState(false);
 // Número de ciclo actual, se utiliza para cambiar de frase
 const [loopNum, setLoopNum] = useState(0);
 // Velocidad de escritura/borrado
 const [typingSpeed, setTypingSpeed] = useState(10);

 // Efecto que controla el proceso de escritura y borrado
 useEffect(() => {
   // Frase actual del ciclo (utiliza el índice loopNum)
   const currentPhrase = phrases[loopNum % phrases.length];

   // Función que maneja la escritura/borrado de la frase
   const handleTyping = () => {
     // Si NO estamos borrando y no hemos terminado de escribir la frase
     if (!isDeleting && index < currentPhrase.length) {
       // Actualiza el texto visible agregando un carácter más
       setDisplayText(currentPhrase.substring(0, index + 1));
       // Avanza al siguiente carácter
       setIndex(index + 1);
       
     } 
     // Si estamos borrando y no hemos borrado toda la frase
     else if (isDeleting && index > 0) {
       // Actualiza el texto visible quitando un carácter
       setDisplayText(currentPhrase.substring(0, index - 1));
       // Retrocede al carácter anterior
       setIndex(index - 1);
       
     } 
     // Si hemos terminado de escribir la frase (index === longitud de la frase)
     else if (!isDeleting && index === currentPhrase.length) {
       // Hace una pausa de 1 segundo antes de empezar a borrar
       setTimeout(() => setIsDeleting(true), 1000);
       
     } 
     // Si hemos terminado de borrar la frase (index === 0)
     else if (isDeleting && index === 0) {
       // Cambiamos a escribir la siguiente frase
       setIsDeleting(false);
       // Avanzamos al siguiente ciclo (siguiente frase)
       setLoopNum(loopNum + 1);
       
     }
   };

   // Ejecuta la función de escritura/borrado con un retraso basado en typingSpeed
   const timer = setTimeout(handleTyping, typingSpeed);

   // Limpia el temporizador en cada renderizado del componente
   return () => clearTimeout(timer);
 }, [index, isDeleting, loopNum]);



  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);

  };

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={displayText || " "}
        className="border rounded-xl w-full m-2 p-2 mt-4 mb-4"
      />
    </div>
  );
};

