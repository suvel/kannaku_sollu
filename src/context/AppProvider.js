import { createContext, useReducer } from "react";
import generateArrProducts from "../functions/generateArrProducts";
import generateArrMembers from "../functions/generateArrMembers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sampleProducts = [
  {
    icon: "🍪",
    prdName: "Butter Biscuit",
    prdPrice: "10",
  },
  {
    icon: "🍎",
    prdName: "Apple",
    prdPrice: "20",
  },
  {
    icon: "🚬",
    prdName: "Cigaret",
    prdPrice: "18",
  },
  {
    icon: "☕",
    prdName: "Coffee",
    prdPrice: "10",
  },
];

const sampleMembers = [
  {
    memName: "Drake Remorey",
  },
];

const initialArg = {
  products: generateArrProducts(sampleProducts),
  members: generateArrMembers(sampleMembers),
  shares: [],
  billName: "Untitled Bill",
};

const reducerActTypes = {
  SET_PRODUCT: "SET_PROD",
  SET_MEMBER: "SET_MEMBER",
  SET_SHARE: "SET_SHARE",
};

function reducer(state, action) {
  switch (action.type) {
    case reducerActTypes.SET_PRODUCT:
      return { ...state, products: action.value };
    case reducerActTypes.SET_MEMBER:
      return { ...state, members: action.value };
    case reducerActTypes.SET_SHARE:
      return { ...state, shares: action.value };
    default:
      throw new Error();
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const notify = (msg) => toast(msg);

  return (
    <AppContext.Provider value={{ state, dispatch, notify }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export { AppContext, reducerActTypes };
export default AppProvider;
