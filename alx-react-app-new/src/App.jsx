import Header from './Header';
import UserProfile from './UserProfile';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Amara Nyei" age={22} bio="A passionate React developer." />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
