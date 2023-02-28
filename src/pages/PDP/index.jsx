import React from "react";
import { AppContext } from "../../appContext";
import { useHistory } from "react-router-dom";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./_.scss";

export function PDPPage({ productId }) {
  //   const params = useParams();
  //   console.log(params.productId);
  //   const [size, setSize] = React.useState("");
  //   const [color, setColor] = React.useState("");

  const ctx = React.useContext(AppContext);
  const { action } = useHistory();
  //   console.log(ctx.products);
  const product = ctx.products.find(({ id }) => id === productId);
  const cartProduct = ctx.user.cart.find(({ id }) => id === productId);
  const [qty, setQty] = React.useState((cartProduct && cartProduct.qty) || 1);
  //   console.log(product);
  React.useEffect(() => {
    if (action === "POP") ctx.loadProducts();
  }, [ctx.loadProducts, ctx.products]);

  React.useEffect(() => {
    if (cartProduct) {
      if (qty === 1 && cartProduct.qty !== qty) setQty(cartProduct.qty);
    }
  });
  //name,,author,type,category,price,desc

  return (
    <section className="product-details-page page">
      {/* PDP -{productId} */}
      {/* <div>{product.name}</div> */}
      {product && (
        <div className="product-info">
          <div className="product-image">
            <img
              src={product.img}
              alt={product.name}
              style={{ width: 300, height: 300 }}
            />
          </div>
          <div className="product-meta">
            <h2>{product.name}</h2>
            <h4>Author:{product.author}</h4>
            <h4>Type:{product.type}</h4>
            <h4>
              Price:
              {product.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h4>
            {/* {product.sizes && (
              <>
                Size:
                <select onChange={(e)=>setSize(e.target.value)}>
                  {product.sizes.map((s) => {
                    <option key={s} value={s}>{s}</option>;
                  })}
                </select>
              </>
            )} */}
            <div className="product-qty">
              Quantity:
              <select
                onChange={(e) => setQty(Number(e.target.value))}
                value={qty}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-action">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  const data = {
                    id: product.id,
                    name: product.name,
                    qty,
                    price: product.price,
                    category: product.category,
                    author: product.author,
                    type: product.type,
                  };
                  ctx.addToCart(data);
                }}
              >
                Add To Cart
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  ctx.removeFromCart({ id: product.id });
                }}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
