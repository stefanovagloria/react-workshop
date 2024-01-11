import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search"
import UsersList from "./components/UsersList";

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <Search/>
          <UsersList/>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
