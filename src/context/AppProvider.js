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
    ],
    bills: [
        {
            'memName': 'Mark Stain',
            'prodExp': '2x🍎+3x🍪',
            'total': 70
        },
        {
            'memName': 'Drake Remorey',
            'prodExp': '1x☕+2x🚬+1x🍪',
            'total': 38
        }
    ]
};

function reducer(state, action) {
    debugger
    switch (action.type) {
        case 'SET_PROD':
            return { ...state, products: action.value };
        case 'SET_MEM':
            return { ...state, members: action.value };
        case 'SET_BILLS':
            return { ...state, bills: action.value };
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