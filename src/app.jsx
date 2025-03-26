import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

// Animations
const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
  100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
`;

const ripple = keyframes`
  0% { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(4); opacity: 0; }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  overflow: hidden;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${glowPulse} 3s infinite ease-in-out;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #00f7ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  color: #d1d1d1;
  text-align: center;
  margin-bottom: 25px;
  line-height: 1.7;
  font-family: 'Poppins', sans-serif;
`;

const Terms = styled(motion.p)`
  font-size: 0.9rem;
  color: #a1a1a1;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
`;

const UploadBox = styled(motion.div)`
  border: 2px dashed #00f7ff;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  background: rgba(0, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: #ff00ff;
  }
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  color: #00f7ff;
  margin: 0;
  font-weight: 500;
`;

const Select = styled(motion.select)`
  width: 100%;
  padding: 12px;
  margin: 20px 0;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #00f7ff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }

  option {
    background: #0a0a0a;
    color: #fff;
  }
`;

const CheckboxContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 25px 0;
`;

const CheckboxLabel = styled(motion.label)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #d1d1d1;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: #00f7ff;
  }
`;

const Checkbox = styled.input`
  margin-right: 12px;
  accent-color: #00f7ff;
  transform: scale(1.3);
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #00f7ff, #ff00ff);
  color: #0a0a0a;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }
`;

const Ripple = styled(motion.span)`
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  animation: ${ripple} 0.6s linear;
`;

const App = () => {
  const [task, setTask] = useState('default');
  const [fastProcessing, setFastProcessing] = useState(false);
  const [calculateStats, setCalculateStats] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('File dropped:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples([...ripples, { x, y, id: Date.now() }]);
    console.log('Processing data with task:', task, 'Fast Processing:', fastProcessing, 'Calculate Stats:', calculateStats);
  };

  return (
    <AppContainer>
      <CanvasWrapper>
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </CanvasWrapper>

      <Card
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Title
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          TotalSegmentator
        </Title>
        <Description
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Try the TotalSegmentator uploading any CT/MR data. The upload must meet the following criteria:
          <br />
          - Only a single CT/MR dataset, minimum size is 400 MB
          <br />
          - Upload should be either a zip file of DICOMs or a single NIFTI image
        </Description>
        <Terms
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          By using this online service you agree to our terms.
        </Terms>

        <UploadBox
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{ scale: isDragging ? 1.05 : 1, borderColor: isDragging ? '#ff00ff' : '#00f7ff' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
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

        <Select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <option value="default">select task (default)</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
        </Select>

        <CheckboxContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <CheckboxLabel whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Checkbox
              type="checkbox"
              checked={fastProcessing}
              onChange={(e) => setFastProcessing(e.target.checked)}
            />
            Choose a subset to avoid long runtime (if none is selected all are selected)
          </CheckboxLabel>
          <CheckboxLabel whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Checkbox
              type="checkbox"
              checked={fastProcessing}
              onChange={(e) => setFastProcessing(e.target.checked)}
            />
            Enable fast processing
          </CheckboxLabel>
          <CheckboxLabel whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Checkbox
              type="checkbox"
              checked={calculateStats}
              onChange={(e) => setCalculateStats(e.target.checked)}
            />
            Calculate statistics (volume and intensity)
          </CheckboxLabel>
        </CheckboxContainer>

        <Button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Process Data
          <AnimatePresence>
            {ripples.map((ripple) => (
              <Ripple
                key={ripple.id}
                style={{ left: ripple.x, top: ripple.y }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
          </AnimatePresence>
        </Button>
      </Card>
    </AppContainer>
  );
};

export default App;