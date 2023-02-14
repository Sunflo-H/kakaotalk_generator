import { createContext, useState } from "react";

export const StorageContext = createContext();

export function StorageProvider({ children }) {
  const [storageList, setStorageList] = useState([
    { title: "조보아", id: 1 },
    { title: "백종원", id: 2 },
  ]);

  return (
    <StorageContext.Provider value={{ storageList, setStorageList }}>
      {children}
    </StorageContext.Provider>
  );
}
