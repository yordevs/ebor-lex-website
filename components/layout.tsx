import Container from "./container";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Container>
          <Header />
          <main>{children}</main>
        </Container>
      </div>
      <Footer />
    </>
  );
}
