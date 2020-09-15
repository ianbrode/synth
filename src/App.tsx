import React, { useState, useMemo } from "react";
import "./App.css";

import Chart from "./components/Chart";
import Input from "./components/Input";
import { createData } from "./utils";

const interval = "0.05";

function App() {
  const [upperBound, setUpperBound] = useState("10.0");
  const [lowerBound, setLowerBound] = useState("-10.0");
  const [mean, setMean] = useState("0");
  const [std, setStd] = useState("1");

  const dataset = useMemo(() => {
    return createData(interval, upperBound, lowerBound, mean, std);
  }, [upperBound, lowerBound, mean, std]);

  return (
    <div className="App">
      <h1>Normal Distribution Explorer</h1>
      <div className="controls">
        <div className="controlWrapper">
          <Input
            value={upperBound}
            onChange={setUpperBound}
            label="Upper Bound"
            step={0.1}
          />
        </div>
        <div className="controlWrapper">
          <Input
            value={lowerBound}
            onChange={setLowerBound}
            label="Lower Bound"
            step={0.1}
          />
        </div>
        <div className="controlWrapper">
          <Input value={mean} onChange={setMean} label="Mean" step={0.1} />
        </div>
        <div className="controlWrapper">
          <Input
            value={std}
            onChange={setStd}
            label="STD"
            min={0.1}
            step={0.1}
          />
        </div>
      </div>
      <div>
        <Chart
          data={dataset}
          mean={mean}
          setMean={setMean}
          std={std}
          setStd={setStd}
        />
      </div>
    </div>
  );
}

export default App;
