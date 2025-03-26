import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Card from './components/Card';
import UploadBox from './components/UploadBox';
import SelectInput from './components/SelectInput';
import CheckboxGroup from './components/CheckboxGroup';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [task, setTask] = useState('default');
  const [fastProcessing, setFastProcessing] = useState(false);
  const [calculateStats, setCalculateStats] = useState(false);

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing data with task:', task, 'Fast Processing:', fastProcessing, 'Calculate Stats:', calculateStats);
  };

  return (
    <div className="app-container">
      <div className="canvas-wrapper">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <Card>
        <UploadBox onFileUpload={handleFileUpload} />
        <SelectInput value={task} onChange={(e) => setTask(e.target.value)} />
        <CheckboxGroup
          fastProcessing={fastProcessing}
          setFastProcessing={setFastProcessing}
          calculateStats={calculateStats}
          setCalculateStats={setCalculateStats}
        />
        <Button onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default App;