import { useRouter } from "next/navigation";

export const checkToken = () => {
  const router = useRouter();

  // Retrieve token from session storage
  const authSession = sessionStorage.getItem("authSession");

  // Redirect to login if token is missing
  if (!authSession) {
    router.push("/login");
  }
};