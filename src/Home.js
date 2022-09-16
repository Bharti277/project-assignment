import React, { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
const GET_API =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";

function Home() {
  const [data, setData] = useState("");
  const [trading, setTrading] = useState([]);
  const mydataArr = [];

  useEffect(() => {
    fetch(GET_API)
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    let trading_array = [];

    let time_series = data["Time Series (5min)"];
    if (time_series === undefined) {
      return undefined;
    }
    if (time_series === null) {
      return null;
    }

    let pricing_data = Object.entries(time_series).map((intraday_data) => {
      let intraday_object = {
        key: intraday_data[0],
        value: intraday_data[1],
      };
      // console.log(intraday_object);
      return intraday_object;
    });

    pricing_data.forEach((item) => {
      let open_data = item.value["1. open"];
      let high_data = item.value["2. high"];
      let low_data = item.value["3. low"];
      let close_data = item.value["4. close"];
      let volume_data = item.value["5. volume"];
      let date_time = item.key;
      trading_array.push({
        open_data: open_data,
        close_data: close_data,
        high_data: high_data,
        low_data: low_data,
        volume_data: volume_data,
        date_time: date_time,
      });
    });
    setTrading(trading_array);
    // console.log(trading_array)
  }, [data]);

  return (
    <div className="home">
      <h1>Welcome to home</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>DateTime</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {trading.map((val) => (
              <tr key={val.date_time}>
                <td>{val.date_time}</td>
                <td>{val.open_data}</td>
                <td>{val.high_data}</td>
                <td>{val.low_data}</td>
                <td>{val.close_data}</td>
                <td>{val.volume_data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
