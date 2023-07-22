import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [urls, setUrls] = useState('');
  const [result, setResult] = useState(null);

  const handleGetNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/numbers?url=${encodeURIComponent(urls)}`);
      setResult(response.data);
    } catch (error) {
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <p>Enter URLs separated by commas:</p>
      <input
        type="text"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        placeholder="e"
      />
      <button onClick={handleGetNumbers}>Get Numbers</button>
      {result && (
        <div>
          <h2>Result:</h2>
          <p>{JSON.stringify(result)}</p>
        </div>
      )}
    </div>
  );
};

export default App;

