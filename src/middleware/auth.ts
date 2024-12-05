import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const authenticate = async (req: NextRequest, res: NextResponse) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return NextResponse.json({ message: "Authentication token is missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Optionally attach the user to the request (if required)
    req.headers.set("user", JSON.stringify(decoded));

    return true; // Authentication passed
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
};


