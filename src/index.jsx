import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "./main.scss";
import { AppRoutes } from "./routes";
import { AppContext } from "./appContext";
import { getData, postData, deleteData, uuidv4, getCartCount } from "./utils";

library.add(fab, fas, far);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchProducts: [],
      user: {
        cart: [],
        addresses: [],
      },
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId") || uuidv4();
    console.log(userId);
    localStorage.setItem("userId", userId);
    this.currentUser(userId);
  }

  findProducts = async (query) => {
    const searchProducts = await getData(`/api/search?query=${query}`);

    this.setState({ searchProducts });
    // console.log("search....", searchProducts);
  };

  loadProducts = async () => {
    const products = await getData("/api/products");
    // console.log(products);

    this.setState({ products });
  };

  getCurrentUserId = () => {
    return localStorage.getItem("userId");
  };

  currentUser = async (id) => {
    const userId = id || this.getCurrentUserId();

    const user = await getData(`/api/currentUser/${userId}`);
    this.setState({ user });
  };

  addToCart = async (p) => {
    const userId = this.getCurrentUserId();

    // console.log(
    //   " `/api/users/${userId}/cart` ---",
    //   `/api/users/${userId}/cart`
    // );
    const resp = await postData(`/api/users/${userId}/cart`, p);
    console.log("addToCart", p, resp);
    this.setState((pS) => ({ user: { ...pS.user, cart: resp } }));
  };

  removeFromCart = async (p) => {
    ///users/:userId/cart/:itemId
    const userId = this.getCurrentUserId();

    const resp = await deleteData(`/api/users/${userId}/cart/${p.id}`, p);
    console.log("REMOVE CART", p, resp);
    this.setState((pS) => ({ user: { ...pS.user, cart: resp } }));
  };

  addToFavorite = () => {};

  removeFromFavorite = () => {};

  onCreateAddress = async (address) => {
    const userId = this.getCurrentUserId();

    const resp = await postData(`/api/users/${userId}/address`, address);
    this.setState((pS) => ({ user: { ...pS.user, addresses: resp } }));
  };

  onSelectAddress = (address) => {
    this.setState((pS) => ({
      checkoutData: { ...pS.checkoutData, address },
    }));
  };

  onSelectPayment = (payment) => {
    this.setState((pS) => ({ checkoutData: { ...pS.checkoutData, payment } }));
  };

  render() {
    const { products, searchProducts, user } = this.state;
    return (
      <AppContext.Provider
        value={{
          products,
          user,
          searchProducts,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          getCurrentUserId: this.getCurrentUserId,
          currentUser: this.currentUser,
          findProducts: this.findProducts,
          loadProducts: this.loadProducts,
          onCreateAddress: this.onCreateAddress,
          onSelectAddress: this.onSelectAddress,
          onSelectPayment: this.onSelectPayment,
        }}
      >
        <AppRoutes />
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// console.log("client side js");
