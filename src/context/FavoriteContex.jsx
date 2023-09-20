import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoritesCars, setFavoritesCars] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favoritesCars, setFavoritesCars }}>
      {children}
    </FavoritesContext.Provider>
  );
};
