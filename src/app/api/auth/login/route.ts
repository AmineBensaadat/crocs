import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the path based on your project structure
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and password are required.",
        response: "info",
      },
      { status: 200 }
    );
  }

  try {
    const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json(
          {
            message: "Invalid credentials.",
            response: "error",
          },
          { status: 200 }
        );
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      return NextResponse.json(
        {
          message: "Successfully Logged in. Redirecting...",
          response: "successful",
          result: results,
          token: token,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Invalid credentials.",
          response: "error",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Error logging in" },
      { status: 500 }
    );
  }
}
