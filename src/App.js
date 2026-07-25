import { HashRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MembersPage from "./pages/MembersPage";
import SplitPage from "./pages/SplitPage";
import SummaryPage from "./pages/SummaryPage";
import { MembersProvider } from "./context/MembersContext";

function App() {
  return (
    <HashRouter>
      <MembersProvider>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/split" element={<SplitPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </MembersProvider>
    </HashRouter>
  );
}

export default App;
