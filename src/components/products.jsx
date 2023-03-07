import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import ProdImage from "./image";

const Products = () => {
  const [item, setItem] = useState();

  const id = useLocation();
  const productId = id.state.id;
  const url = "https://localhost:7093/products/";
  const getProdUrl = url + productId;

  useEffect(() => {
    fetch(getProdUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setItem(data);
      });
  }, [getProdUrl]);

  const decimalCheck = (pris, rabattPris, campaign) => {
    // kontrollerar prisets decimaler. Samt, om det är rea, så stryk över det gamla priset.

    if (pris % 1 === 0) {
      if (campaign !== "Null" && rabattPris < 100) {
        return <div className="strikeThrough">{pris} Kr</div>;
      }
      return pris + " Kr";
    }
    if (!pris % 1 === 0) {
      pris = Math.round(pris);
      if (campaign !== "Null" && rabattPris < 100) {
        return <div className="strikeThrough">{pris} Kr</div>;
      }
      return pris + " Kr";
    }
  };

  const campaignPrice = (pris, rabattProcent, campaign) => {
    // uppdaterar priset med procentsats
    if (campaign !== "Null") {
      if (rabattProcent < 100) {
        const discount = (100 - rabattProcent) / 100;
        pris = pris * discount;

        if (!pris % 1 === 0) {
          pris = Math.round(pris);
          return pris + " Kr";
        }
      }
    }
  };

  const renderCampaign = (campaign, rabattProcent) => {
    // Kollar om det är en aktiv kampanj, samt att rabatten inte överstriger 100% ifall den gör det så kommer INTE en rea flagga presenteras
    if (campaign !== "Null" && rabattProcent < 100) {
      return (
        <div id="reaFlagDivProdPage">
          <div id="rea">Rea!</div>
          <div id="reaProcent">{rabattProcent} %</div>
        </div>
      );
    }
  };

  const handleClick = () => {
    alert("Produkten ligger i korgen");
  };

  const mapData = (array) => {
    return (
      <div className="prodPageDiv">
        {renderCampaign(array.campaign, array.reapris)}
        <ProdImage imageUrl={array.imageUrl} />

        <h3>{array.name}</h3>
        <div className="description">{array.description}</div>
        <div className="fat">
          {decimalCheck(array.price, array.reapris, array.campaign)}
        </div>
        <div className="reaPris">
          {campaignPrice(array.price, array.reapris, array.campaign)}
        </div>
        <button className="buyMe" onClick={handleClick}>
          Lägg i Varukorg
        </button>
      </div>
    );
  };

  return item && mapData(item);
};
export default Products;
