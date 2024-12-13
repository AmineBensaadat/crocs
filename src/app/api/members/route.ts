// src/app/api/members/route.ts

import { NextResponse } from "next/server";
import db from "@/lib/db";
import { authenticate } from "@/middleware/auth";

export async function GET(
  req: Request,
  { params }: { params?: { id: string } }
) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }
  // Extract query parameters
  const url = new URL(req.url);
  const planId = url.searchParams.get("plan_id");

  if (params?.id) {
    // Fetch one member by ID
    const [rows] = await db.execute("SELECT * FROM members WHERE id = ?", [
      params.id,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Member not found", response: "error" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Member fetched successfully",
      response: "successful",
      member: rows[0],
    });
  } else {
    // fetch by filters
    let query = `SELECT m.*, p.name AS plan_name, p.duration_days, p.price, mf.file_name 
    FROM members m 
    LEFT JOIN plans p ON m.plan_id = p.id 
    LEFT JOIN members_files mf ON m.id = mf.member_id 
    LEFT JOIN subscriptions sb ON m.id = sb.member_id 
    WHERE m.club_id = 1
      `;
    let queryParams: any[] = [];

    switch (true) {
      case !!planId:
        query += "AND m.plan_id = ?";
        queryParams.push(planId);
        break;
      default:
        // No filters applied
        break;
    }

    try {
      const [rows] = await db.execute(query, queryParams);
     
      return NextResponse.json({
        message: "Members fetched successfully",
        response: rows,
        status: "successful",
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: "Error fetching members",
          response: "error",
          error: error,
        },
        { status: 500 }
      );
    }
    //return NextResponse.json({ message: "Members fetched successfully", response: rows, status: "successful" });
  }
}

export async function POST(req: Request) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const { name, email, phone } = await req.json();
  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and email are required", response: "error" },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO members (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone || null]
    );
    return NextResponse.json({
      message: "Member created successfully",
      response: "successful",
      memberId: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating member", response: "error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const memberId = params.id;
  const data = await req.json();

  if (!data.name || !data.email) {
    return NextResponse.json(
      { message: "Name and email are required", response: "error" },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.execute(
      "UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?",
      [data.name, data.email, data.phone || null, memberId]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Member not found or not updated", response: "error" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Member updated successfully",
      response: "successful",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating member", response: "error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const memberId = params.id;

  try {
    const [result] = await db.execute("DELETE FROM members WHERE id = ?", [
      memberId,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Member not found", response: "error" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Member deleted successfully",
      response: "successful",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting member", response: "error" },
      { status: 500 }
    );
  }
}
