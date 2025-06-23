"use client";

import dynamic from "next/dynamic";

// Dynamically import GlobalVideoBackground to prevent hydration issues
const DynamicGlobalVideoBackground = dynamic(
  () => import("./GlobalVideoBackground"),
  { ssr: false }
);

const ClientVideoBackground = () => {
  return <DynamicGlobalVideoBackground />;
};

export default ClientVideoBackground;
