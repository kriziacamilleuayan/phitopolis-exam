import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [result, setResult] = useState();
  const inputElementRef = useRef();

  const handleKeyDown = (e) => {
    if (inputElementRef && inputElementRef.current) {
      const { value } = inputElementRef.current;
      const checkValue = value.split(",").pop();

      console.log("checl", checkValue.substring(checkValue.length - 1) === ",");

      if (
        (Number(checkValue) > 0 && e.which === 189) ||
        (checkValue.includes("-") && e.which === 189) ||
        (checkValue.substring(checkValue.length - 1) === "," && e.which === 188)
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
    }
  };

  const handleSubmit = () => {
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
      return;
    }

    return calculate(res);
  };

  const calculate = (arr) => {
    console.log(arr);

    let result = 0;

    for (let i = 0; i < arr.length; i++) {
      if (i + 1 < arr.length) {
        const diff = Math.abs(arr[i] - arr[i + 1]);
        console.log("diff", diff);
        result = Math.max(result, diff);
      }
    }

    setResult(result);
  };

  return (
    <div className="App">
      <input
        ref={inputElementRef}
        type="text"
        id="inputData"
        value={data}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
