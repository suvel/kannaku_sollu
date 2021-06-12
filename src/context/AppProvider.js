import { createContext, useReducer } from 'react'

const initialArg = {
    products: [{
        'icon': '🍪',
        'prdName': 'Butter Biscuit',
        'prdPrice': '10',
    },
    {
        'icon': '🍎',
        'prdName': 'Apple',
        'prdPrice': '20',
    },
    {
        'icon': '🚬',
        'prdName': 'Cigaret',
        'prdPrice': '18',
    },
    {
        'icon': '☕',
        'prdName': 'Coffee',
        'prdPrice': '10',
    },],
    members: [
        {
            'memName': 'Mark Stain',
        },
        {
            'memName': 'Drake Remorey',
        },
    ]
};

function reducer(state, action) {
    debugger
    switch (action.type) {
        case 'SET_PROD':
            return { ...state, products: action.value };
        case 'SET_MEM':
            return { ...state, members: action.value };
        default:
            throw new Error();
    }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialArg);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext };
export default AppProvider;