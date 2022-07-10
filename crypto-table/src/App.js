import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table";
import axios from "axios";

function App() {
  const [cryptoTable, setCryptoTable] = useState([]);

  useEffect(() => {
    axios("https://api.binance.com/api/v3/ticker/24hr")
      //axios("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setCryptoTable(response.data);
      })
      .catch((err) => {
        console.error("Erro recebendo dado: ", err);
      });
  }, []);

  const colunas = [
    { heading: "#", value: "index" },
    { heading: "Name", value: "symbol" },
    { heading: "Price", value: "lastPrice" },
    { heading: "Marketcap  w/ pair", value: "Marketcap" },
    { heading: "24h %", value: "24hourPercentage" },
    { heading: "Volume (24h)", value: "quoteVolume" },
  ];

  return (
    <div className="App">
      <Table data={cryptoTable} column={colunas} />
    </div>
  );
}

export default App;
