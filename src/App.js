import { HashRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MembersPage from "./pages/MembersPage";
import SplitPage from "./pages/SplitPage";
import SummaryPage from "./pages/SummaryPage";
import { MembersProvider } from "./context/MembersContext";
import { ProductsProvider } from "./context/ProductsContext";
import { LedgerProvider } from "./context/LedgerContext";
import { ROUTES } from "./constants";

function App() {
  return (
    <HashRouter>
      <MembersProvider>
        <ProductsProvider>
          <LedgerProvider>
            <Routes>
              <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
              <Route path={ROUTES.MEMBERS} element={<MembersPage />} />
              <Route path={ROUTES.SPLIT} element={<SplitPage />} />
              <Route path={ROUTES.SUMMARY} element={<SummaryPage />} />
            </Routes>
          </LedgerProvider>
        </ProductsProvider>
      </MembersProvider>
    </HashRouter>
  );
}

export default App;
