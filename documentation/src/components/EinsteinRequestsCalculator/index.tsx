import React, { useState, useRef, useEffect } from "react";
import { encodingForModel } from "js-tiktoken";
import nlp from "compromise";
import "./index.css";

export default function EinsteinRequestCalculator() {
  const [tokens, setTokens] = useState("");
  const [usageType, setUsageType] = useState("standard tier");
  const [result, setResult] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [tokenCount, setTokenCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const starterFormulaRef = useRef(null);
  const standardFormulaRef = useRef(null);

  const calculateRequests = () => {
    const tokenCount = parseInt(tokens);
    if (isNaN(tokenCount) || tokenCount < 0) {
      setResult("Please enter a valid number of tokens.");
      return;
    }

    const apiCallSizeFactor = Math.ceil(tokenCount / 2000);
    const usageMultiplier = usageType === "starter tier" ? 7 : 10;
    const einsteinRequests = apiCallSizeFactor * usageMultiplier;

    setResult(`This will consume ${einsteinRequests} Einstein Requests.`);
  };

  const shortcutTokens = [100, 1999, 2000, 2001];

  const starterFormula = `=CEILING(TokenCount/2000,1) * 7`;
  const standardFormula = `=CEILING(TokenCount/2000,1) * 10`;

  const selectFormula = (ref) => {
    if (ref.current) {
      ref.current.select();
    }
  };

  const countTokens = async () => {
    if (selectedModel === "Other") {
      setTokenCount(Math.ceil(inputText.length / 4));
    } else {
      try {
        const enc = encodingForModel(selectedModel);
        const tokens = enc.encode(inputText);
        setTokenCount(tokens.length);
      } catch (error) {
        console.error("Error counting tokens:", error);
        setTokenCount(0);
      }
    }
  };

  const countWords = (text) => {
    const doc = nlp(text);
    return doc.terms().length;
  };

  useEffect(() => {
    countTokens();
    setWordCount(countWords(inputText));
  }, [inputText, selectedModel]);

  return (
    <>
      <h2>Calculator</h2>
      <label htmlFor="tokens" className="block mb-2 font-medium">
        Number of Tokens
      </label>
      <input
        id="tokens"
        type="number"
        value={tokens}
        onChange={(e) => setTokens(e.target.value)}
        placeholder="Enter number of tokens or select one of the examples"
        className="w-full p-2 border rounded"
      />
      <div className="flex flex-wrap gap-2 mt-4 mb-4" id="exampleTokens">
        {shortcutTokens.map((count) => (
          <button
            key={count}
            onClick={() => setTokens(count.toString())}
            className="button button--outline button--secondary"
          >
            {count}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="usageType" className="block mb-2 font-medium">
          Usage Type
        </label>
        <select
          id="usageType"
          value={usageType}
          onChange={(e) => setUsageType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="starter tier">Starter tier</option>
          <option value="standard tier">Standard tier</option>
        </select>
      </div>
      <button onClick={calculateRequests} className="button button--primary">
        Calculate
      </button>
      {result && (
        <p className="mt-4 mb-4 p-3 bg-green-100 text-green-700 rounded">
          {result}
        </p>
      )}
      <h2 className="margin-top--lg">Token and Word Counter</h2>
      <div className="mb-4">
        <label htmlFor="modelSelect" className="block mb-2 font-medium">
          Select Model
        </label>
        <select
          id="modelSelect"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4o">GPT-4o/4o mini</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="inputText" className="block mb-2 font-medium">
          Paste your prompt here
        </label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your prompt here to count tokens and words"
          rows={5}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <p className="font-medium">
          Word Count: <span className="text-blue-600">{wordCount}</span>
        </p>
        <p className="font-medium">
          Token Count: <span className="text-blue-600">{tokenCount}</span>
        </p>
      </div>
      <h2 className="">Formulas</h2>
      <p className="mb-2 text-sm">
        Use these formulas in Excel or Google Sheets by replacing TokenCount
        with the number of tokens.
      </p>
      <div className="mb-2">
        <label htmlFor="starterFormula" className="block mb-1 font-medium">
          Starter Tier Formula:
        </label>
        <input
          id="starterFormula"
          ref={starterFormulaRef}
          readOnly
          value={starterFormula}
          onClick={() => selectFormula(starterFormulaRef)}
          className="w-full p-2 bg-gray-100 rounded cursor-pointer"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="standardFormula" className="block mb-1 font-medium">
          Standard Tier Formula:
        </label>
        <input
          id="standardFormula"
          ref={standardFormulaRef}
          readOnly
          value={standardFormula}
          onClick={() => selectFormula(standardFormulaRef)}
          className="w-full p-2 bg-gray-100 rounded cursor-pointer"
        />
      </div>
    </>
  );
}
