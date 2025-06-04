import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (isAuthenticated()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirecting...</p>
    </div>
  );
};

export default Home;
