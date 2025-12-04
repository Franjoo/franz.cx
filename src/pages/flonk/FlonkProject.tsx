import { Routes, Route } from 'react-router-dom';
import FlonkLanding from './FlonkLanding';
import FlonkTerms from './Terms';
import FlonkEula from './Eula';
import FlonkPrivacy from './Privacy';

/**
 * FLONK Project Module
 *
 * This component encapsulates all FLONK-related routes and pages.
 * It's lazy-loaded to ensure the main app bundle doesn't include
 * FLONK assets unless the user navigates to /p/flonk/*
 */
export default function FlonkProject() {
  return (
    <Routes>
      <Route path="/" element={<FlonkLanding />} />
      <Route path="/terms" element={<FlonkTerms />} />
      <Route path="/eula" element={<FlonkEula />} />
      <Route path="/privacy" element={<FlonkPrivacy />} />
    </Routes>
  );
}
