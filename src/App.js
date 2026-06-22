import React, { useState } from 'react';
import CaptureScreen from './screens/CaptureScreen';
import LoadingScreen from './screens/LoadingScreen';
import PathsScreen from './screens/PathsScreen';
import ExpandScreen from './screens/ExpandScreen';
import { generatePaths } from './hooks/useBranching';

export default function App() {
  const [screen, setScreen] = useState('capture');
  const [pathData, setPathData] = useState(null);
  const [chosenPath, setChosenPath] = useState(null);
  const [userImage, setUserImage] = useState(null);

  async function handleCapture(base64, context) {
    setUserImage(base64);
    setScreen('loading');
    const data = await generatePaths(base64, context);
    setPathData(data);
    setScreen('paths');
  }

  function handleExpand(path) {
    setChosenPath(path);
    setScreen('expand');
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {screen === 'capture' && (
        <CaptureScreen onCapture={handleCapture} />
      )}
      {screen === 'loading' && (
        <LoadingScreen />
      )}
      {screen === 'paths' && (
        <PathsScreen
          data={pathData}
          userImage={userImage}
          onExpand={handleExpand}
          onBack={() => setScreen('capture')}
        />
      )}
      {screen === 'expand' && (
        <ExpandScreen
          path={chosenPath}
          userImage={userImage}
          onBack={() => setScreen('paths')}
          onChoose={() => setScreen('capture')}
        />
      )}
    </div>
  );
}