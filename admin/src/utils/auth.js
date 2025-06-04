import Cookies from "js-cookie";
import Router from "next/router";

// Store token in cookie
export const setAuthToken = (token) => {
  Cookies.set("auth_token", token, { expires: 30 });
};

// Get token from cookie
export const getAuthToken = () => {
  return Cookies.get("auth_token");
};

// Store user data in cookie
export const setUserData = (userData) => {
  Cookies.set("user_data", JSON.stringify(userData), { expires: 30 });
};

// Get user data from cookie
export const getUserData = () => {
  const userData = Cookies.get("user_data");
  return userData ? JSON.parse(userData) : null;
};

// Clear auth data and redirect to login
export const logout = () => {
  Cookies.remove("auth_token");
  Cookies.remove("user_data");
  Router.push("/login");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Redirect if not authenticated (for protected pages)
export const requireAuth = (ctx) => {
  // For server-side rendering
  if (ctx?.req) {
    const { req } = ctx;
    const cookies = req.headers.cookie || "";

    if (!cookies.includes("auth_token=")) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
  // For client-side rendering
  else if (typeof window !== "undefined") {
    if (!isAuthenticated()) {
      Router.push("/login");
      return {
        props: {},
      };
    }
  }

  return { props: {} };
};
