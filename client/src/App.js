import './App.css';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
