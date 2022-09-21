import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PhoneProvider } from "./contexts/PhoneContext";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Logout from "./components/Logout";
import AddPhone from "./components/AddPhonePage/AddPhone";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import PhoneDetailsPage from "./components/PhoneDetailsPage/PhoneDetails";
import EditPage from "./components/EditPage/EditPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Profiles from "./components/ProfilePage/Profiles";
import TransactionPage from "./components/TransactionPage/TransactionPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <PhoneProvider>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addPhone" element={<AddPhone />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route
                path="/catalog/details/:phoneId"
                element={<PhoneDetailsPage />}
              />
              <Route path="/catalog/edit/:phoneId" element={<EditPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profiles/:username" element={<Profiles />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </PhoneProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
