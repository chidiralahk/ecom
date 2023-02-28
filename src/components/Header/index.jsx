import React from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getData } from "../../utils";
import { AppContext } from "../../appContext";
import { getCartCount } from "../../utils";
import "./_.scss";

export function Header() {
  const [query, setQuery] = React.useState("");
  const ctx = React.useContext(AppContext);
  const { path } = useRouteMatch();
  // const [products, setProducts] = React.useState([]);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      (async () => {
        if (query) await ctx.findProducts(query);

        setQuery("");
      })();
    },
    [query, setQuery, ctx.findProducts]
  );

  const onChange = React.useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }, []);

  if (ctx.searchProducts.length && path !== "/search")
    return <Redirect to="/search" />;

  return (
    <header className="header">
      <div className="search-box">
        <form onSubmit={onSubmit}>
          <span className="search-icon" onClick={onSubmit}>
            <FontAwesomeIcon icon={["fas", "search"]} />
          </span>
          <input
            className="search-box__query"
            value={query}
            onChange={onChange}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="items">
        <Link to="/login" className="log-in">
          Log In
        </Link>
        <Link to="/register" className="create-ac">
          Create account
        </Link>
        <Link to="/cart" className="cart">
          {`${getCartCount(ctx.user.cart)} Cart`}
        </Link>
      </div>
      {/* <Link to="/">Home</Link>&nbsp;&nbsp;
      <Link to="/search">Search</Link> */}
    </header>
  );
}
