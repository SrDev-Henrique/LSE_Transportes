import About from "./(sections)/About/About";
import Hero from "./(sections)/Hero/Hero";
import Services from "./(sections)/Servicos/Services";
import Container from "@/components/Container/Container";
import Topics from "./(sections)/Topics/Topics";
import Contact from "./(sections)/Contact/Contact";
import Footer from "./(sections)/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Services />
        <About />
        <Topics />
        <Contact />
        <Footer />
      </Container>
    </main>
  );
}
