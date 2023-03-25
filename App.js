import React from 'react';
import RootNavigation from './src/navigation/rootnavigation';
import {ContextProvider} from './src/utils/context-api/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <RootNavigation />
    </ContextProvider>
  );
};

export default App;
