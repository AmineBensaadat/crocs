import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust based on your structure

export async function GET(req: Request, { params }: { params: { id?: string } }) {
  try {
    if (params.id) {
      // Fetch a single member by ID
      const [rows] = await db.execute("SELECT * FROM members WHERE id = ?", [params.id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ message: "Member not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Member fetched successfully", member: rows[0] });
    }

    // Fetch all members if no ID is provided
    const [rows] = await db.execute("SELECT * FROM members");
    return NextResponse.json({ message: "Members fetched successfully", members: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching members" }, { status: 500 });
  }
}
