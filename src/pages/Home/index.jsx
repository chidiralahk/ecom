import React from "react";
import "./_.scss";
// import { getData } from "../../utils";
import { AppContext } from "../../appContext";
import ProductsList from "../../components/productCard";

export function HomePage() {
  const ctx = React.useContext(AppContext);
  // console.log(ctx.loadProducts());
  React.useEffect(() => {
    ctx.loadProducts();
  }, [ctx.loadProducts]);
  return (
    <section className="home-page page">
      <div className="banner">
        <div className="img img-800x400" />
      </div>
      <ProductsList products={ctx.products} />
    </section>
  );
}
