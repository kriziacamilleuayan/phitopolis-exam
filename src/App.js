import { useState, useRef } from "react";
import "./App.css";

import { ReactComponent as Star } from "./star-icon.svg";

function App() {
  const [data, setData] = useState("");
  const [result, setResult] = useState(null);
  const [validate, setValidate] = useState(0);
  const inputElementRef = useRef();

  const validateText = [
    "",
    "Please input atleast 2 numbers from -1000 to 1000 and separated by comma.",
    "Please input atleast 2 numbers.",
  ];

  const handleKeyDown = (e) => {
    if (inputElementRef && inputElementRef.current) {
      const { value } = inputElementRef.current;
      const checkValue = value.split(",").pop();

      if (
        (Number(checkValue) > 0 && e.which === 189) ||
        (checkValue.includes("-") && e.which === 189)
      ) {
        return e.preventDefault();
      }
    }
  };

  const handleChange = (e) => {
    let { value } = inputElementRef.current;
    const checkValue = value.split(",").pop();

    if (Number(checkValue) > 1000 && Number(checkValue) < -1000) return;

    const regEx = /^[0-9,-.]*$/; //only allows 0-9 , . - characters
    const check = regEx.test(value);

    if (check) {
      const checkValue = value.split(",").pop();
      if (Number(checkValue) > 1000 || Number(checkValue) < -1000) return; // not more than 1000 and not less than -1000
      setData(value);
      setResult(null);
    }
  };

  const handleSubmit = () => {
    if (data === "") {
      return setValidate(1);
    }

    //extra filter if user pasted the value
    const res = data
      .split(",")
      .map((x) => {
        if (x === "") return; // remove extra comma
        if (isNaN(Number(x))) return; // remove nan
        if (x > 1000 || x < -1000) return;
        return Number(x);
      })
      .filter((n) => n !== undefined); // remove all undefined

    // if data inputted is less than 2 it will return 0
    if (res.length < 2) {
      setResult(0);
      setValidate(2);
      return;
    }

    return calculate(res);
  };

  const calculate = (arr) => {
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
      if (i + 1 < arr.length) {
        const diff = Math.abs(arr[i] - arr[i + 1]);
        result = Math.max(result, diff);
      }
    }

    setResult(result);
    setValidate(0);
  };

  return (
    <div className="App">
      <h1>Input Data Here</h1>
      <input
        ref={inputElementRef}
        type="text"
        id="inputData"
        value={data}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {validate !== 0 && <span>{validateText[validate]}</span>}
      <button onClick={handleSubmit}>Submit</button>

      <div
        className={
          result === null ? "resultContainer hidden" : " resultContainer show"
        }
      >
        <Star className="star" width={30} height={30} />
        <h1 className="result">{result}</h1>
        <Star className="star" width={30} height={30} />
      </div>
    </div>
  );
}

export default App;
