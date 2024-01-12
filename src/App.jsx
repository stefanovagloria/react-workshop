import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserSection from "./components/UserSection";

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <UserSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
