import React from "react";
import { AppContext } from "../../appContext";
import ProductsList from "../../components/productCard";
// import "./_.scss";
// import { fetchData } from "../../utils";

export function SearchResultsPage() {
  const ctx = React.useContext(AppContext);
  console.log(ctx.searchProducts);
  return (
    <section className="page search-results-page">
      <div className="banner">
        <div className="img img-800x400" />
      </div>
      <ProductsList products={ctx.searchProducts} />
    </section>
  );
}
