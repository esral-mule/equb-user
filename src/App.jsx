import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import Logout from "./pages/Logout";
import { AnimatePresence } from "framer-motion";
import ListEqubes from "./pages/ListEqubes";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Contribuitons from "./pages/Contribuitons";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AnimatePresence mode="wait">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signout" element={<Logout />} />
                  <Route
                    path="/equbes"
                    element={
                      <ProtectedRoute>
                        <ListEqubes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/equbdetail/:id"
                    element={
                      <ProtectedRoute>
                        <Contribuitons />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
