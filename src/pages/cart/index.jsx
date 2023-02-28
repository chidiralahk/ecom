import React from "react";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../../appContext";

const tableHeader = [
  "name",
  "category",
  "author",
  "size",
  "type",
  "price",
  "action",
];

export function CartPage() {
  const ctx = React.useContext(AppContext);
  const { cart } = ctx.user;

  if (cart.length === 0) return <Redirect to="/" />;

  const cartTotal = cart.reduce((total, { price, salePrice }) => {
    return total + (salePrice || price);
  }, 0.0);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th> </th>
            {tableHeader.map((a) => (
              <th key={a}>{`${a[0].toUpperCase()}${a.slice(1)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map((r, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              {tableHeader.map((a) => {
                if (a === "action") {
                  //div>button*2>Remove from cart and add to fav
                  return null;
                }
                return <th key={a}>{r[a]}</th>;
              })}
            </tr>
          ))}
          <tr>
            <th colSpan={6}>Cart Total :</th>
            <th colSpan={1}>
              {cartTotal.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </th>
            <th colSpan={1}>
              <Link to="/delivery" style={{ backgroundColor: "royalblue" }}>
                Checkout
              </Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
