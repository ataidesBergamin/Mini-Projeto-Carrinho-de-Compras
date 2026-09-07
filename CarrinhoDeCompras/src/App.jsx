import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Falha from "./pages/Falha";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Carrinho />} />

        <Route path="/pagamento" element={<Pagamento />} />

        <Route path="/sucesso" element={<Sucesso />} />

        <Route path="/falha" element={<Falha />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
