import { HashRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MembersPage from "./pages/MembersPage";
import SplitPage from "./pages/SplitPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
