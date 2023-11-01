"use client";
import { ChangeEvent, useState } from "react";

const Input = ({ dolarValue }: { dolarValue: number }) => {
  const [number, setNumber] = useState("3250");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const cleanValue = Number(value.replace(/,|\.|\$/g, ""));
    setNumber((cleanValue / 100).toString());
  };

  // Format the number with a thousands separator.
  const formattedNumber = Number(number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div
        className=" bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-800 via-violet-900 to-purple-800
      flex flex-col items-center justify-between px-4 py-2 rounded-2xl w-60 font-mono 
      "
      >
        <input
          className="text-center bg-purple-400 text-slate-100 rounded"
          type="text"
          pattern="^\$[1-9][0-9]*"
          name="usd"
          value={formattedNumber}
          onChange={handleInputChange}
          autoFocus
          //   disabled
        />
        <div className="text-white">
          {(Number(number) * dolarValue).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </div>
      </div>
    </>
  );
};

export default Input;
