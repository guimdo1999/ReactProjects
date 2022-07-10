import React, { useState } from "react";
import "./Table.css";
import useSortOnTable from "../../Hooks/Sort";
import Accordion from "../Accordion/Accordion";
import numberFormatBrl from "../../Hooks/FormatBrl";

function Table({ data, column }) {
  const [show, setShow] = useState();
  const [toggle, setToggle] = useState(false);

  const cryptoData = data;

  //Organizando a tabela
  var indice = 0;
  cryptoData.map((item) => {
    // eslint-disable-next-line
    if (item["symbol"].endsWith("BRL") && item["openPrice"] != 0) {
      indice++;
      item["index"] = indice;
      item["marketcap"] = item["count"] * item["lastPrice"];
    }
    return cryptoData;
  });
  cryptoData.sort((a, b) => {
    if (a.symbol < b.symbol) {
      return -1;
    }
    if (a.symbol > b.symbol) {
      return 1;
    }
    return 0;
  });
  const { items, requestSort } = useSortOnTable(cryptoData);

  //Accordion
  const accordion = (row) => {
    setShow(row + "acc");
    setToggle(!toggle);
  };

  //Tabela
  const TableHeadData = ({ item }) => {
    switch (item.heading) {
      case "#":
        return (
          <th
            className="headingText heading"
            onClick={() => requestSort(item.value)}
          >
            {item.heading}
          </th>
        );
      case "Name":
        return (
          <th
            className="headingText heading"
            onClick={() => requestSort(item.value)}
          >
            {item.heading}
          </th>
        );
      case "24h %":
        return (
          <th
            className="headingPerc heading"
            onClick={() => requestSort(item.value)}
          >
            {item.heading}
          </th>
        );

      default:
        return (
          <th
            className="headingPrices heading"
            onClick={() => requestSort(item.value)}
          >
            {item.heading}
          </th>
        );
    }
  };

  const TableRowData = ({ item, column }) => {
    // eslint-disable-next-line
    if (item["symbol"].endsWith("BRL") && item["openPrice"] != 0) {
      return (
        <>
          <tr
            className="bodytr"
            key={item["index"]}
            onClick={() => {
              accordion(item["index"]);
            }}
          >
            {column.map((columnItem) => {
              switch (columnItem.value) {
                case "index":
                  return <td className="index">{item["index"]}</td>;

                case "symbol":
                  return (
                    <td className="symbol">
                      {item[`${columnItem.value}`].replace("BRL", "")}
                    </td>
                  );

                case "Marketcap": //
                  var mktcap = item["marketcap"];
                  return <td>{numberFormatBrl(mktcap)}</td>;

                case "24hourPercentage": //Porcentagem de ganho
                  var VarDailyPerc =
                    Number(item["priceChangePercent"])
                      .toFixed(2)
                      .replace(".", ",") + "%";
                  //Checa se valor é positivo ou negativo
                  if (!VarDailyPerc.includes("-")) {
                    return (
                      <td className="perc24 positivePerc">{VarDailyPerc}</td>
                    );
                  } else {
                    return (
                      <td className="perc24 negativePerc">{VarDailyPerc}</td>
                    );
                  }

                default:
                  return (
                    <td className="priceValues">
                      {numberFormatBrl(item[`${columnItem.value}`])}
                    </td>
                  );
              }
            })}
          </tr>
          {show === item["index"] + "acc" && toggle ? (
            <Accordion dados={item} key={item["index"] + "acc"} />
          ) : (
            !toggle
          )}
        </>
      );
    }
  };

  //Montando na página
  return (
    <table>
      <thead className="headingTable">
        <tr>
          {column.map((item) => (
            <TableHeadData item={item} />
          ))}
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => (
          <TableRowData item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
