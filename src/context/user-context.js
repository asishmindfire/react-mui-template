import { useState, useEffect, createContext, useContext } from "react";
import { NotificationManager } from "react-notifications";

const UserContext = createContext({
  user: null,
  loginUser: () => {},
});

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user && user.role === "admin");
  }, [user]);

  //   useEffect(() => {
  //     BackendApi.user
  //       .getProfile()
  //       .then(({ user, error }) => {
  //         if (error) {
  //           console.error(error);
  //         } else {
  //           setUser(user);
  //         }
  //       })
  //       .catch(console.error);
  //   }, []);

  const loginUser = async (username, password) => {
    console.log(`Context Api loginUser =>`, username, password);
    // const { user, error } = await BackendApi.user.login(username, password)
    let user = {
        username: "marvel",
        pasword: "marvel",
        role: "student",
      };
    if (username === "asish") {
        user = {
          username: "asish",
          pasword: "asish",
          role: "admin",
        };
    }
    // if (user.error) {
    //   NotificationManager.error("I am error.");
    // } else {
      NotificationManager.success("Logged in successfully");
      setUser(user);
    // }
  };

  const logoutUser = async () => {
    setUser(null);
    console.log(`Context Api logoutUser`);
    // await BackendApi.user.logout()
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
