import { HashRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MembersPage from "./pages/MembersPage";
import SplitPage from "./pages/SplitPage";
import SummaryPage from "./pages/SummaryPage";
import { MembersProvider } from "./context/MembersContext";
import { ProductsProvider } from "./context/ProductsContext";
import { LedgerProvider } from "./context/LedgerContext";

function App() {
  return (
    <HashRouter>
      <MembersProvider>
        <ProductsProvider>
          <LedgerProvider>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/split" element={<SplitPage />} />
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
          </LedgerProvider>
        </ProductsProvider>
      </MembersProvider>
    </HashRouter>
  );
}

export default App;
