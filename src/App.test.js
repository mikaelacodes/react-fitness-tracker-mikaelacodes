// App.test.js
// Smoke test: the app renders and shows the FitTrack brand. Fuller routing and
// integration tests live in src/__tests__/ (added in the testing phase).

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the FitTrack app shell', () => {
  render(<App />);
  // The brand appears in the navbar (and elsewhere) once the app mounts.
  expect(screen.getAllByText(/FitTrack/i).length).toBeGreaterThan(0);
});
