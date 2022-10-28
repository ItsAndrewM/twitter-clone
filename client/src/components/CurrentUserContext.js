import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUseProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserTweets, setCurrentUserTweets] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        fetch("/api/me/profile")
        .then(res => res.json())
        .then(data => {
            setStatus("loaded");
            setCurrentUser(data)})

        fetch(`/api/treasurymog/feed`)
        .then(res => res.json())
        .then(data => {
            setCurrentUserTweets(data);

        })
    }, [])
    console.log(status)
    console.log(currentUser)
    console.log(currentUserTweets)

    return (
        <CurrentUserContext.Provider value={{currentUser, status, currentUserTweets}}>
            {children}
        </CurrentUserContext.Provider>
    );
};