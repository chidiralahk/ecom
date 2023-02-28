import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./_.scss";

export function Accordion({ iconClass = "fas", rows, onChange, openIndices }) {
  return (
    <div className="accordion">
      {rows.map((row, index) => {
        const isOpen = openIndices.includes(index);
        const icon = isOpen
          ? row.iconOpen || "chevron-up"
          : row.iconClose || "chevron-down";
        return (
          <div className="accordion-item" key={row.id}>
            <h2 className="accordion-header" onClick={() => onChange(index)}>
              <span>{row.label}</span>
              <span>
                <FontAwesomeIcon icon={[iconClass, icon]} />
              </span>
            </h2>
            <div className={`accordion-collapse ${isOpen ? "show" : ""}`}>
              <div className="accordion-body">{row.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
