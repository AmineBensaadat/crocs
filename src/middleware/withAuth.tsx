import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth"; // Utility function to get token from sessionStorage

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push("/login"); // Redirect to login if token is missing
      }
    }, []);

    // Render only if token is present
    const token = getToken();
    if (!token) {
      return null; // Optionally, add a loading spinner here
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
