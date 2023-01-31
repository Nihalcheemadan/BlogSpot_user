import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const initialState = {
  
  userProfile: false,
  notification: false,
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [isClicked, setIsClicked] = useState(initialState);
  
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });


  const login = () => {
    //TO DO
    setCurrentUser({
      
      id: 1,
      name: "Nihal",
      profilePic:
        "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
