import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Header } from "./components/Header.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Footer } from "./components/Footer.tsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContex.tsx";

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      <App />
      {!hideLayout && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <LayoutWrapper />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </>
);
