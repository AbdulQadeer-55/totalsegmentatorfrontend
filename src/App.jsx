import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('default');
  const [fastProcessing, setFastProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handleFastProcessingChange = () => setFastProcessing(!fastProcessing);

  // Handle drag-and-drop events
  const onDragEnter = useCallback(() => setIsDragging(true), []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.zip') || droppedFile.name.endsWith('.nii.gz'))) {
      setFile(droppedFile);
    } else {
      alert('Please upload a valid DICOM.zip or NIFTI.nii.gz file.');
    }
  }, []);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.name.endsWith('.zip') || selectedFile.name.endsWith('.nii.gz'))) {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid DICOM.zip or NIFTI.nii.gz file.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-blue-500 border-opacity-30 glow-effect">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-blue-300 mb-4 text-center tracking-tight animate-pulse">
          TotalSegmentator
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Try the TotalSegmentator uploading any CT/MR data. The upload MUST meet the criteria:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Only a single CT/MR dataset, minimum size is 400 MB</li>
          <li>Upload should be either a zip file of DICOMs or a single NIFTI image</li>
        </ul>
        <p className="text-gray-400 text-center mb-8 italic">
          By using this online service you agree to our{' '}
          <a href="#" className="text-blue-400 hover:underline">
            terms
          </a>
          .
        </p>

        {/* File Upload Section with Drag-and-Drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all duration-300 ${
            isDragging ? 'border-blue-400 bg-blue-900 bg-opacity-20' : 'border-blue-600'
          } upload-box`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <p className="text-gray-300 mb-4">
            {file ? (
              <span className="text-blue-300">File: {file.name}</span>
            ) : (
              <>
                Drop DICOM.zip or NIFTI.nii.gz here <br /> or click to upload
              </>
            )}
          </p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".zip,.nii.gz"
            onChange={onFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
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
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
              className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 rounded"
            />
            Choose a subset to avoid long runtime (if none is selected ALL are selected)
          </label>
          <p className="text-gray-400 text-sm mt-2">Enable fast-processing</p>
          <p className="text-gray-400 text-sm">Calculate statistics (volume and intensity)</p>
        </div>

        {/* Process Button */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          disabled={!file}
        >
          Process Data
        </button>

        {/* Footer Notes */}
        <p className="text-gray-400 text-sm mt-6">
          If used for research purposes, please cite our Radiology AI paper. The results might not be used commercially, please contact us for further results are open for any usage.
          <br />
          If this website does not work, please create an issue on{' '}
          <a href="#" className="text-blue-400 hover:underline">
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