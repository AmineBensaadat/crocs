// lib/auth.ts
export const getToken = (): string | null => {
  try {
    const authSession = sessionStorage.getItem("authSession"); // Retrieve the stored string
    if (authSession) {
      const parsedSession = JSON.parse(authSession); // Parse the JSON
      return parsedSession.token || null; // Return the token, or null if not found
    }
    return null; // If no authSession is found
  } catch (error) {
    console.error("Error parsing auth session:", error);
    return null; // Handle cases where JSON parsing fails
  }
};
