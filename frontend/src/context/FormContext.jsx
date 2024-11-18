import { createContext, useContext, useState } from "react";

// create a context
export const FormContext = createContext();

// create a provider component
export const FormContextProvider = ({ children }) => {
    const [form, setForm] = useState({ title: '', desc: '' });
    const [formDiv, setFormDiv] = useState(false);

    return (
        <FormContext.Provider value={{ form, setForm, formDiv, setFormDiv }}>
            {children}
        </FormContext.Provider>
    )
}