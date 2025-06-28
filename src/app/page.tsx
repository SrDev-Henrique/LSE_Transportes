import Hero from "./(sections)/Hero/Hero";
import Services from "./(sections)/Servicos/Services";
import Container from "@/components/Container/Container";

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Services />
      </Container>
    </main>
  );
}
