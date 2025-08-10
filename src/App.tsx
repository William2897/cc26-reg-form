import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { RegistrationProvider, useRegistration } from './contexts/RegistrationContext';
import { WelcomePage } from './pages/WelcomePage';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { HealthInfoPage } from './pages/HealthInfoPage';
import { FamilyInfoPage } from './pages/FamilyInfoPage';
import { TermsPage } from './pages/TermsPage';
import { SummaryPage } from './pages/SummaryPage';
import { PaymentPage } from './pages/PaymentPage';

const AppContent: React.FC = () => {
  const { state } = useRegistration();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <WelcomePage />;
      case 2:
        return <PersonalInfoPage />;
      case 3:
        return <HealthInfoPage />;
      case 4:
        return <FamilyInfoPage />;
      case 5:
        return <TermsPage />;
      case 6:
        return <SummaryPage />;
      case 7:
        return <PaymentPage />;
      default:
        return <WelcomePage />;
    }
  };

  return renderCurrentStep();
};

function App() {
  return (
    <ThemeProvider>
      <RegistrationProvider>
        <AppContent />
      </RegistrationProvider>
    </ThemeProvider>
  );
}

export default App;