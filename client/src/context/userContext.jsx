import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log("Context data==>", user)

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ userData }) => {
                setUser(userData)

            })
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }} >
            {children}
        </UserContext.Provider>
    )
}





