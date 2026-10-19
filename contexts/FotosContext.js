import { createContext, useContext, useState } from "react";

const FotosContext = createContext();

export function FotosProvider({ children }) {

  const [fotos, setFotos] = useState([]);

  function adicionarFoto(uri) {

    setFotos((atuais) => [
      { uri, data: new Date().toLocaleString("pt-BR") },
      ...atuais,
    ]);
  }

  return (
    <FotosContext.Provider value={{ fotos, adicionarFoto }}>
      {children}
    </FotosContext.Provider>
  );
}

export function useFotos() {
  return useContext(FotosContext);
}