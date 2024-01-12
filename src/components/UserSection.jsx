import Search from "./Search";
import UsersList from "./UsersList";

const UserSection = () => {
  return (
    <section className="card users-container">
      <Search />
      <UsersList />
    </section>
  );
};

export default UserSection;
