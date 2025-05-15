import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Experience from "./components/Experience"; // Import the new Experience component
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features id="skills" /> {/* Skills section */}
      <Experience /> {/* Replace Story with Experience component */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
