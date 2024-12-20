import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

export const useBlogContext = () => {
    const context = useContext(BlogContext)

    if(!context) {
        throw Error("useBlogContext must be use inside an BlogContextProvider")
    }

    return context;
}

