import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../appContext";
import "./_.scss";

export default function ProductsList({ products }) {
  const ctx = React.useContext(AppContext);
  return (
    <div className="products-list">
      {products.map(({ id, name, img, price, author, category, type }) => (
        <div className="product" key={id}>
          <div className="product-img">
            <Link to={`/product/${id}/`}>
              <img src={img} alt={name} style={{ width: 200, height: 200 }} />
            </Link>
          </div>
          <div className="product-name">{name}</div>
          <div className="product-price">
            {price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </div>
          <div className="product-action">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                ctx.addToCart({
                  id,
                  name,
                  qty: 1,
                  price,
                  category,
                  author,
                  type,
                });
              }}
            >
              Add To Cart
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                ctx.removeFromCart({ id });
              }}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
