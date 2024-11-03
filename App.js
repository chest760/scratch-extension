import React, { useEffect, useState } from "react";
import { db, saveData, fetchData } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    const newData = {
      text: input,
      timestamp: new Date(),
    };
    await saveData(newData);
    setInput("");
  };

  return (
    <div>
      <h1>FirestoreとReact</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
