import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('default');
  const [fastProcessing, setFastProcessing] = useState(false);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handleFastProcessingChange = () => setFastProcessing(!fastProcessing);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] p-6">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-2xl w-full border border-indigo-500 border-opacity-30 glow-effect">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-indigo-300 mb-4 text-center tracking-tight">TotalSegmentator</h1>
        <p className="text-gray-300 text-center mb-6">
          Try the TotalSegmentator uploading any CT/MR data. The upload MUST meet the criteria:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Only a single CT/MR dataset, minimum size is 400 MB</li>
          <li>Upload should be either a zip file of DICOMs or a single NIFTI image</li>
        </ul>
        <p className="text-gray-400 text-center mb-8 italic">
          By using this online service you agree to our{' '}
          <a href="#" className="text-indigo-400 hover:underline">
            terms
          </a>
          .
        </p>

        {/* File Upload Section */}
        <div className="border-2 border-dashed border-indigo-400 rounded-lg p-8 mb-6 text-center upload-box">
          <p className="text-gray-300 mb-4">
            Drop DICOM.zip or NIFTI.nii.gz here <br /> or click to upload
          </p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".zip,.nii.gz"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Select File
          </label>
        </div>

        {/* Task Selection */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Select task</label>
          <select
            value={task}
            onChange={handleTaskChange}
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          >
            <option value="default">total (default)</option>
            <option value="task1">Task 1</option>
            <option value="task2">Task 2</option>
          </select>
        </div>

        {/* Options */}
        <div className="mb-6">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={fastProcessing}
              onChange={handleFastProcessingChange}
              className="mr-2 h-5 w-5 text-indigo-500 focus:ring-indigo-400 rounded"
            />
            Choose a subset to avoid long runtime (if none is selected ALL are selected)
          </label>
          <p className="text-gray-400 text-sm mt-2">Enable fast-processing</p>
          <p className="text-gray-400 text-sm">Calculate statistics (volume and intensity)</p>
        </div>

        {/* Process Button */}
        <button className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
          Process Data
        </button>

        {/* Footer Notes */}
        <p className="text-gray-400 text-sm mt-6">
          If used for research purposes, please cite our Radiology AI paper. The results might not be used commercially, please contact us for further results are open for any usage.
          <br />
          If this website does not work, please create an issue on{' '}
          <a href="#" className="text-indigo-400 hover:underline">
            github
          </a>
          .
        </p>
        <p className="text-gray-500 text-sm mt-4">
          This software is a prototype version and is not designed or intended for use in the diagnosis or classification of any medical complaint or for any other medical use. The user represents and warrants that it will not use or redistribute the Software for such purposes. This prototype is for medical research purposes only. This software is provided "AS IS", without warranty of any kind.
          <br />
          Created by the Department of Research at University Hospital Basel © 2022 - present
        </p>
      </div>
    </div>
  );
}

export default App;
