import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [type, setType] = useState<string>('prime')
  const [response, setResponse] = useState<any>(null)

  const fetchAverage = async () => {
    try {
      const res = await axios.get(`/api/average?type=${type}`)
      setResponse(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Average Calculator</h1>
      <div className="mb-4">
        <label className="mr-2">Select Number Type:</label>
        <select
          className="p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="prime">Prime</option>
          <option value="fibonacci">Fibonacci</option>
          <option value="even">Even</option>
          <option value="random">Random</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchAverage}
      >
        Fetch Average
      </button>
      {response && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-2">Response:</h2>
          <pre className="bg-gray-200 p-2 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
