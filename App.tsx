// My Mechanic — application entry. The app itself lives in ./src (restored from the existing build).
import type { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const App: ComponentType = require('./src/App').default;

export default App;
