import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [repoName, setRepoName] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchRepoInfo = async () => {
    try {
      const response = await axios.get(`https://ardova-backend.onrender.com/github/repo_info?repo_name=${repoName}`);
      setRepoInfo(response.data);
      setError('');
    } catch (err) {
      setError('Repository not found');
      setRepoInfo(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar with inline style */}
      <div style={{ backgroundColor: '#1C2541' }} className="w-78 text-white p-6 ">
        <h1 className="text-2xl font-bold mb-6 text-center mt-8">GitHub Repo Info</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter repo name (e.g., facebook/react)"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            onClick={fetchRepoInfo}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Get Repo Info
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {repoInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Repository Information</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Repo Name</th>
                  <th className="py-2">Repo Description</th>
                  <th className="py-2">No. of Stars</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4">{repoInfo.repo_name}</td>
                  <td className="py-4">{repoInfo.description}</td>
                  <td className="py-4">{repoInfo.stars}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;