import { createContext, useState } from "react";

export const UserDataContext = createContext({
  user: { email: "", fullname: { firstName: "", lastName: "" } },
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
