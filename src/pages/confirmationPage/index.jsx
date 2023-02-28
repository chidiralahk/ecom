import React from "react";
import { getFutureDayAfter } from "../../utils";

export function ConfirmationPage() {
  const randomDays = [4, 5, 6, 7, 8, 9];
  const dayAfterDay = randomDays[Math.floor(Math.random() * randomDays.length)];

  return (
    <div className="confirmation-page page">
      <h1>Thank you! Your Order is placed successfully</h1>
      <h1>{`It wil reach you on before ${getFutureDayAfter(dayAfterDay)}`}</h1>
      <hr />
      <div>Here&apos;s the items</div>
      <div>Items List </div>
      <hr />
      <div>Delivery Address</div>
      <div>Address</div>
      <hr />
      <div>Payment</div>
      <div>Payment Details</div>
      <hr />
    </div>
  );
}
