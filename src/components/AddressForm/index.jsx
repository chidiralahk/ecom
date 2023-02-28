import React from "react";

export function AddressForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
      </div>
      <div className="form-field">
        <label htmlFor="addrln1">Address Ln 1:</label>
        <input id="addrln1" />
      </div>
      <div className="form-field">
        <label htmlFor="addrln2">Address Ln 2:</label>
        <input id="addrln2" />
      </div>
      <div className="form-field">
        <label htmlFor="landmark">Landmark</label>
        <input id="landmark" />
      </div>
      <div className="form-field">
        <label htmlFor="city">City:</label>
        <input id="city" />
      </div>
      <div className="form-field">
        <label htmlFor="pincode">Pin Code:</label>
        <input id="pincode" />
      </div>
      <div className="form-field">
        <label htmlFor="save">Save:</label>
        <input id="save" type="submit" />
      </div>
    </form>
  );
}
