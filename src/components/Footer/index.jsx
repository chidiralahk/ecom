import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AcceptedPayments } from "../AcceptedPayments";
import "./_.scss";

export function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col">
          <FontAwesomeIcon size="10x" icon={["fab", "asymmetrik"]} />
        </div>
        <div className="col">
          <h3>NEWSLETTER</h3>
          <p>
            Subscribe for exclusive offers, special events and a good tall fish
            tale or two.
          </p>
        </div>
        <div className="col">
          LINKS
          <div>
            <Link to="shop">Shop</Link>
          </div>
          <div>
            <Link to="about-us">About Us</Link>
          </div>
          <div>
            <Link to="shipping">Shipping</Link>
          </div>
          <div>
            <Link to="terms">Terms</Link>
          </div>
          <div>
            <Link to="privacy">Privacy</Link>
          </div>
          <div>
            <Link to="returns">Returns</Link>
          </div>
        </div>
        <div className="col">
          <h3>GET IN TOUCH</h3> Contact us info@mollyjogger.com
        </div>
      </div>
      <div className="row payments">
        <div className="col">
          <h3>Accepted Payments</h3>
          <FontAwesomeIcon
            icon={["fab", "cc-amex"]}
            size="2x"
            style={{ color: "blue" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-discover"]}
            size="2x"
            style={{ color: "#d5f545" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-visa"]}
            size="2x"
            style={{ color: "blue" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-paypal"]}
            size="2x"
            style={{ color: "orange" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-mastercard"]}
            size="2x"
            style={{ color: "maroon" }}
          />
        </div>
      </div>

      {/* <AcceptedPayments /> */}
    </footer>
  );
}
