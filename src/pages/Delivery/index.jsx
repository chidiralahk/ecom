import React from "react";
import { AppContext } from "../../appContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "../../components/accordian";
import "./_.scss";
import { useHistory } from "react-router-dom";
import { AddressForm } from "../../components/AddressForm";

function mapAddressToAccordionCell(cell) {
  if (cell) {
    return {
      id: cell.name,
      label: cell.name,
      body: (
        <div>
          <h3>{cell.name}</h3>
          <p>
            {[cell.addrln1, cell.addrln2, cell.landmark, cell.city].join(", ")}{" "}
            - {cell.pincode}
          </p>
        </div>
      ),
    };
  }

  return null;
}

export function DeliveryPage() {
  const ctx = React.useContext(AppContext);
  const [openIndices, setOpenIndices] = React.useState([]);
  const { push } = useHistory();
  const addresses = ctx.user.addresses ? ctx.user.addresses : [];

  console.log("ctx.checkoutData---->", ctx.checkoutData);

  const onChange = React.useCallback(
    (itemIndex) => {
      setOpenIndices((pS) => (pS.includes(itemIndex) ? [] : [itemIndex]));
    },
    [addresses]
  );

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    const formData = {};
    for (const field of e.target.elements) {
      if (field.type !== "submit") formData[field.id] = field.value;
    }
    async function save() {
      await ctx.onCreateAddress(formData);
      setOpenIndices([]);
    }

    save();
  }, []);

  React.useEffect(() => {
    if (openIndices.length) {
      ctx.onSelectAddress(addresses[openIndices[0]]);
    }
  }, [ctx.onSelectAddress, openIndices]);

  const rows = [
    ...addresses.map(mapAddressToAccordionCell),
    {
      id: "addNewAddress",
      label: "Add New Address",
      body: <AddressForm onSubmit={onSubmit} />,
    },
  ];

  const disabled = openIndices.length === 0;

  return (
    <div className="delivery-page page">
      Delivery Page
      <Accordion
        openIndices={openIndices}
        iconClass="fas"
        onChange={onChange}
        rows={rows}
      />
      <button
        disabled={disabled}
        style={{
          marginLeft: 16,
          padding: 8,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (!disabled) push("/payment");
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
