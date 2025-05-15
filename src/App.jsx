import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Projects from "./components/Projects"; // Import the new Projects component
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features id="skills" /> {/* Skills section */}
      <Story id="experience" /> {/* Experience section */}
      <Projects /> {/* Add the Projects component here */}
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
