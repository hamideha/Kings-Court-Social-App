import { createContext, useReducer } from "react";

import Reducer from './reducer'

const initialState = { currentUser: {} };
export const Context = createContext(initialState);
const { Provider } = Context;

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
};

export default Store;