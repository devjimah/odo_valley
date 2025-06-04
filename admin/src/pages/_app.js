import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Don't use Layout for login page
  const isLoginPage = router.pathname === "/login";

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Odo Valley Admin</title>
      </Head>

      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
