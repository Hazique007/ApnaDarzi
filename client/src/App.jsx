import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router-dom";

// Pages
import LandingPage from "./pages/Landing-Page/landing";
import ProductPage from "./pages/Product-Page/product";
import SearchPage from "./pages/Search-Page/SearchPage";
// import LoginPage from "./pages/Authentication/Login/login"
import Otp from "./pages/Authentication/OtpVerification/otpPage";
import AuthLanding from "./pages/Authentication/AuthLanding";
import FabricPage from "./pages/Fabric-Page/fabric";
import Customize from "./pages/Customization/Customize";
import OrderSummary from "./pages/Order-Page/order-summary";
import OrderSuccessful from "./pages/Order-Page/order-successful";
import ProfilePage from "./pages/Profile-Page/profile";
import HelpAndSupport from "./pages/Profile-Page/Profile-Components/helpandsupport";
import AllAddresses from "./pages/Profile-Page/Profile-Components/allAddresses";
import PersonalDetails from "./pages/Profile-Page/Profile-Components/personalDetails";
import orderHistory from "./pages/Profile-Page/Profile-Components/orderHistory";
import EditAgent from "./pages/Agent/EditAgent";

// Components
import CategoryPage from "./components/categoryPage";
import ProductCart from "./components/productCart";
import TrendingProductDetails from "./components/TrendingProductDetails";
import AllCategory from "./components/allCategory";
import CartPage from "./components/cartpage";

// Context API
import { ProductProvider } from "./Context Api/trackProduct";

// Miscellaneous
import NotFound from "./pages/NotFound/notfound";
import Error from "./components/error";
import FashionProductDetails from "./components/fashionProductDetails";
import ClickStats from "./pages/Stats/clickStats";
import SubCategoryWise from "./pages/Admin/adminComponents/subCategoryWise";
import EditCategory from "./pages/Admin/Listing/editCategory";
import AddCategory from "./pages/Admin/Listing/addNewCategory";
import AddSubCategory from "./pages/Admin/Listing/addNewSubCategory";
import UserList from "./pages/Agent/UserList";
import ListingPage from "./pages/Admin/Listing/listingPage";
import orderPlacedSuccess from "./pages/Order-Page/orderPlacedSuccess";
import ReactGA from "react-ga4";

const App = () => {
  const TRACKING_ID = "G-XGBTSVLN5W";
  if (window.location.hostname === "localhost") {
    ReactGA.initialize(TRACKING_ID, { debug: true });
  } else {
    ReactGA.initialize(TRACKING_ID);
  }

  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  const [confirmationResult, setConfirmationResult] = useState(null);

  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication */}
          <Route path="/" Component={AuthLanding} />

          {/* Main Pages */}
          <Route path="/home" Component={LandingPage} />

          <Route path="/otp" Component={Otp} />

          <Route path="/profile" Component={ProfilePage} />
          <Route path="/orders" Component={orderHistory} />
          <Route path="/product" Component={ProductPage} />
          <Route path="/fabric" Component={FabricPage} />
          <Route path="/customize" Component={Customize} />
          <Route path="/ordersummary" Component={OrderSummary} />
          <Route
            path="/orderSuccessful/:userID/:orderID"
            Component={OrderSuccessful}
          />
          <Route path="/search" Component={SearchPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/error" Component={Error} />
          <Route path="/orderplaced" Component={orderPlacedSuccess} />
          <Route path="/edit-agent/:orderID" Component={EditAgent} />

          {/* Profile Sub-pages */}
          <Route path="/addresses" Component={AllAddresses} />
          <Route path="/help-support" Component={HelpAndSupport} />
          <Route path="/personal-details" Component={PersonalDetails} />

          {/* Dynamic Routes */}
          <Route path="/product/:gender" Component={CategoryPage} />
          <Route path="/product/:gender/:category" Component={ProductPage} />
          <Route
            path="/product/:gender/:category/:subCategory"
            Component={ProductPage}
          />

          {/* Additional Components */}
          <Route path="/AllCategory" Component={AllCategory} />
          <Route
            path="/TrendingProduct/:gender/:category"
            Component={TrendingProductDetails}
          />
          <Route path="/userlist" Component={UserList} />

          <Route
            path="/FashionProduct/:gender/:category"
            Component={FashionProductDetails}
          />
          <Route path="/stats" Component={ClickStats} />
          <Route path="/listing" Component={ListingPage} />
          <Route
            path="/listing/:gender/:category/:subCategory"
            Component={SubCategoryWise}
          />
          <Route path="/listing/:gender/:category" Component={EditCategory} />
          <Route path="/add-new-category" Component={AddCategory} />
          <Route path="/add-new-subcategory" Component={AddSubCategory} />
          {/* Fallback Route */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
