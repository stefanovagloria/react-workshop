import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import UsersList from "./components/UsersList";
import Create from "./components/Create";
import { useState } from "react";

function App() {
  const [showCreate, setShowCreate] = useState(false);

  const onCreateClickHandler = () => setShowCreate(true);

  const onCloseClickHandler = () => setShowCreate(false);

  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <Search />
          <UsersList onUserAdding={onCreateClickHandler}/>
          {showCreate && <Create onClose={onCloseClickHandler}/>}
     
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
