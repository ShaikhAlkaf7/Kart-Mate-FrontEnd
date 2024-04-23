import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/adminComponents/AdminSideBar";

const allLeters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "123456789";
const allSymbol = "!@#$%^&*()_+|?/><";
const GenrateCopun = () => {
  const [prefix, setPrefix] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharectores, setIncludCharectores] = useState(false);
  const [includeSymbol, setIncludSymbol] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [size, setSize] = useState(8);
  const [cupon, setCupon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!includeCharectores && !includeNumbers && !includeSymbol)
      return alert("Please select at least one");
    let result = prefix || "";

    const loopLenght = size - result.length;

    for (let i = 0; i < loopLenght; i++) {
      let entireString = "";
      if (includeCharectores) entireString += allLeters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbol) entireString += allSymbol;

      const randomNumber = Math.floor(Math.random() * entireString.length);
      result += entireString[randomNumber];
    }
    setCupon(result);
  };

  const copytText = async () => {
    await window.navigator.clipboard.writeText(cupon);
    setIsCopied(true);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [cupon]);

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <AdminSideBar />
      </div>
      <main className=" text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full">
        <section className="bg-[#AED2FF] md:w-[50%] w-[90%] m-auto rounded-lg my-16 p-4 flex flex-col items-center">
          <h1 className="text-center font-semibold text-xl">Genrete Cupon</h1>
          <form className="max-w-96 w-full m-auto p-4 " onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between flex-wrap">
              <input
                type="text"
                placeholder="Text to include "
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={size}
                className="p-4 outline-none border border-black rounded-md 
              "
              />
              <input
                type="number"
                placeholder="Cupon Length"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                min={8}
                max={25}
                className="p-4 outline-none border border-black rounded-md "
              />
            </div>
            <fieldset className="border p-4 rounded-md border-black flex items-center justify-evenly gap-4  flex-wrap">
              <legend>Include</legend>
              <div className="flex items-center gap-1 ">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  id="numbers"
                  className="cursor-pointer"
                />
                <label htmlFor="numbers" className="cursor-pointer">
                  Numbers
                </label>
              </div>

              <div className="flex items-center gap-1 ">
                <input
                  type="checkbox"
                  checked={includeCharectores}
                  onChange={() => setIncludCharectores(!includeCharectores)}
                  className="cursor-pointer"
                  id="charector"
                />
                <label htmlFor="charector" className="cursor-pointer">
                  Charectors
                </label>
              </div>

              <div className="flex items-center gap-1 ">
                <input
                  type="checkbox"
                  checked={includeSymbol}
                  onChange={() => setIncludSymbol(!includeSymbol)}
                  className="cursor-pointer"
                  id="symbol"
                />
                <label htmlFor="symbol" className="cursor-pointer">
                  Symbol
                </label>
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full px-2 py-3 bg-[#280274] hover:bg-[#3652AD] hover:text-black mt-4 rounded-lg font-semibold text-white"
            >
              Genrate
            </button>
          </form>
          {cupon && (
            <code className="my-2 m-auto relative ">
              {cupon}{" "}
              <span
                onClick={copytText}
                className="absolute  bg-gray-700 top-0 left-0 w-full text-center rounded-lg text-white opacity-0 hover:opacity-100 cursor-pointer z-50"
              >
                {isCopied ? "copied" : "copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default GenrateCopun;
