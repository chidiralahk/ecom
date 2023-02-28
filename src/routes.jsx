import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { HomePage } from "./pages/Home";
import { PDPPage } from "./pages/PDP";
import { SearchResultsPage } from "./pages/SearchResults";
import { CartPage } from "./pages/cart";
import { DeliveryPage } from "./pages/Delivery";
import { AppContext } from "./appContext";
import { PaymentPage } from "./pages/paymentPage";

function PublicLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function PrivateLayout({ children }) {
  const ctx = React.useContext(AppContext);
  if (ctx.getCurrentUserId()) {
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }

  return <h1>Please Log In</h1>;
}
export function AppRoutes(props) {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        {/* public */}
        <Route path="/" exact>
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        </Route>
        <Route path="/search">
          <PublicLayout>
            <SearchResultsPage />
          </PublicLayout>
        </Route>

        <Route
          path="/product/:productId/*"
          render={({ match }) => (
            <PublicLayout>
              <PDPPage productId={match.params.productId} />
            </PublicLayout>
          )}
        />

        {/* user-auth */}
        <Route
          path="/login"
          element={
            <PrivateLayout>
              <SearchResultsPage />
            </PrivateLayout>
          }
        />
        <Route path="/register">
          <PrivateLayout>
            <SearchResultsPage />
          </PrivateLayout>
        </Route>

        {/* authenticated/private */}
        <Route
          path="/cart"
          render={() => (
            <PrivateLayout>
              <CartPage />
            </PrivateLayout>
          )}
        />

        <Route
          path="/delivery"
          render={() => (
            <PrivateLayout>
              <DeliveryPage />
            </PrivateLayout>
          )}
        />

        <Route
          path="/payment"
          render={() => (
            <PrivateLayout>
              <PaymentPage />
            </PrivateLayout>
          )}
        />
        <Route path="*" element={<Redirect to="/" />} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
