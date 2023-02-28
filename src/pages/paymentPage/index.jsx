import React from "react";
import { isCardValid } from "../../utils";
import { useHistory } from "react-router-dom";

export function PaymentPage() {
  const { push } = useHistory();
  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    const formData = {};
    for (const field of e.target.elements) {
      if (field.type !== "submit") formData[field.id] = field.value;
    }

    // async function save() {
    //   console.log("formData--------->", formData);

    //   // await ctx.onCreateAddress(formData);
    //   // isCardValid
    // }

    async function save() {
      push("/confirmation");

      // if (isCardValid(formData.cardNumber)) {
      //   console.log("formData--------->", formData);
      //   // await ctx.onCreateAddress(formData);
      // } else {
      //   // error card number is not valid
      // }
    }

    save();
  }, []);

  return (
    <section className="payment-page page">
      <h2> Payment Page</h2>

      <form onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="cardHolderName">
            Name:
            <input type="text" id="cardHolderName" />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="cardNumber">
            Card Number:
            <input type="text" id="cardNumber" />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="cardExpiryYear">
            Card Expiry Year:
            <input type="text" id="cardExpiryYear" />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="cardExpiryMonth">
            Card Expiry Month:
            <input type="text" id="cardExpiryMonth" />
          </label>
        </div>

        <div className="form-field">
          <label htmlFor="cardCVV">
            CVV:
            <input type="text" id="cardCVV" />
          </label>
        </div>
        <div className="form-field">
          <input type="submit" name="submit" value="Pay" />
        </div>
      </form>
    </section>
  );
}
