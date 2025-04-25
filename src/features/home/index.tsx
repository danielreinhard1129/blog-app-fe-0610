import BlogList from "./components/BlogList";
import Jumbotron from "./components/Jumbotron";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4">
      <Jumbotron />
      <BlogList />
    </main>
  );
};

export default HomePage;
