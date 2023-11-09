import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isUserAvailable, setIsUserAvailable] = useState(null);
    console.log("Context data==>", user)

    

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data: userData }) => {
                setUser(userData);
                setIsUserAvailable(true);
            });
        }
    }, [user, setUser]);

    return (
        <UserContext.Provider value={{ user, setUser,isUserAvailable }} >
            {children}
        </UserContext.Provider>
    )
}





