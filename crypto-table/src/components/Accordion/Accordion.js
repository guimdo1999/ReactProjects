import React from "react";
import numberFormatBrl from "../../Hooks/FormatBrl";
import "./Accordion.css";

function Accordion({ dados }) {
  return (
    <table className="accTable">
      <tr>
        <td className="accTable">Preço abertura</td>
        <td className="accTable">{numberFormatBrl(dados.openPrice)}</td>
        <td className="accTable">Maior preço</td>
        <td className="accTable">{numberFormatBrl(dados.highPrice)}</td>
      </tr>
      <tr>
        <td className="accTable"></td>
        <td className="accTable"></td>
        <td className="accTable">Menor preço</td>
        <td className="accTable">{numberFormatBrl(dados.lowPrice)}</td>
      </tr>
      <tr>
        <td className="accTable">Valor do Volume</td>
        <td className="accTable">{numberFormatBrl(dados.quoteVolume)}</td>
        <td className="accTable">Volume</td>
        <td className="accTable">{numberFormatBrl(dados.volume)}</td>
      </tr>
    </table>
  );
}

export default Accordion;
