import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
      <Footer />
    </html>
  );
};

export default RootLayout;
