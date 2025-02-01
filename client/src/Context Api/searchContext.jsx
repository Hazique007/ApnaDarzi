import { useState, createContext } from "react";
const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        isSearch,
        setIsSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
export default SearchContextProvider;