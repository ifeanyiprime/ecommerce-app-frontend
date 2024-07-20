import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
    const [word, setWord] = useState("");
    const [word2, setWord2] = useState("");
    const navigate = useNavigate();
  
    return (
      <>
        <form className="flex justify-between space-x-2 max-w-[300px]"
          onSubmit={(e) => {
            navigate("/dictionary/" + word);
          }}
        >
          <input
          className="shrink min-w-0 px-2 py-1 rounded"
          placeholder="Dinosaur"
            type="text"
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded py-1 px-2">Search</button>
        </form>
      </>
    );
  }