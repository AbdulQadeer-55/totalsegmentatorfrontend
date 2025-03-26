import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 25px;
  padding: 40px;
  width: 100%;
  max-width: 650px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.2s ease-out;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #0f2027;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  background: linear-gradient(90deg, #0f2027, #2c5364);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 25px;
  line-height: 1.7;
`;

const Terms = styled.p`
  font-size: 0.85rem;
  color: #888;
  text-align: center;
  margin-bottom: 30px;
  font-style: italic;
`;

const UploadBox = styled.div`
  border: 2px dashed #2c5364;
  border-radius: 12px;
  padding: 35px;
  text-align: center;
  background: #f9fbfc;
  transition: all 0.4s ease;
  cursor: pointer;
  animation: ${pulse} 2s infinite ease-in-out;

  &:hover {
    background: #e6f0fa;
    border-color: #0f2027;
    transform: scale(1.02);
  }
`;

const UploadText = styled.p`
  font-size: 1.1rem;
  color: #203a43;
  margin: 0;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 20px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #333;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2c5364;
    box-shadow: 0 0 8px rgba(44, 83, 100, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #444;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #0f2027;
  }
`;

const Checkbox = styled.input`
  margin-right: 12px;
  accent-color: #2c5364;
  transform: scale(1.2);
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #2c5364, #0f2027);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(90deg, #0f2027, #2c5364);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
`;

const App = () => {
  const [task, setTask] = useState('default');
  const [fastProcessing, setFastProcessing] = useState(false);
  const [calculateStats, setCalculateStats] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing data with task:', task, 'Fast Processing:', fastProcessing, 'Calculate Stats:', calculateStats);
  };

  return (
    <AppContainer>
      <Card>
        <Title>TotalSegmentator</Title>
        <Description>
          Try the TotalSegmentator uploading any CT/MR data. The upload must meet the following criteria:
          <br />
          - Only a single CT/MR dataset, minimum size is 400 MB
          <br />
          - Upload should be either a zip file of DICOMs or a single NIFTI image
        </Description>
        <Terms>By using this online service you agree to our terms.</Terms>

        <UploadBox>
          <UploadText>Drop DICOM.zip or NIFTI.nii.gz here or click to upload</UploadText>
          <input
            type="file"
            accept=".zip,.nii.gz"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block', height: '100%' }} />
        </UploadBox>

        <Select value={task} onChange={(e) => setTask(e.target.value)}>
          <option value="default">select task (default)</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
        </Select>

        <CheckboxContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={fastProcessing}
              onChange={(e) => setFastProcessing(e.target.checked)}
            />
            Choose a subset to avoid long runtime (if none is selected all are selected)
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={fastProcessing}
              onChange={(e) => setFastProcessing(e.target.checked)}
            />
            Enable fast processing
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={calculateStats}
              onChange={(e) => setCalculateStats(e.target.checked)}
            />
            Calculate statistics (volume and intensity)
          </CheckboxLabel>
        </CheckboxContainer>

        <Button onClick={handleSubmit}>Process Data</Button>
      </Card>
    </AppContainer>
  );
};

export default App;