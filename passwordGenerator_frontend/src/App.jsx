import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberChecked, setNumberChecked] = useState(false);
  const [symbolChecked, setSymbolChecked] = useState(false);
  const [password, setPassword] = useState("password");

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberChecked) {
      str += "0123456789";
    }
    if (symbolChecked) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberChecked, symbolChecked]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberChecked, symbolChecked, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-5 my-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-orange-400">
      <h1 className="text-white text-2xl font-bold text-center mb-6 tracking-wide">
        🔐 Password Generator
      </h1>
      <div className="m-2">
        <img src="/Pass.png" alt="Lock" />
      </div>
      <div className="mt-10 flex shadow-inner rounded-xl overflow-hidden mb-4 bg-white/10 backdrop-blur-md">
        <input
          type="text"
          value={password}
          className="w-full py-2 px-4 bg-transparent text-white placeholder-orange-300 outline-none"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold transition-colors duration-300"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ml-32 mb-2 font-semibold transition-colors duration-300 rounded-full"
        onClick={passwordGenerator}
      >
        New Password
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer w-full sm:w-auto"
          />
          <label className="text-sm font-medium">Length: {length}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={numberChecked}
            id="numberInput"
            onChange={() => {
              setNumberChecked((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="cursor-pointer">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={symbolChecked}
            id="characterInput"
            onChange={() => {
              setSymbolChecked((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="cursor-pointer">
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
