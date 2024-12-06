import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { authenticate } from '@/middleware/auth';

export async function GET(req: Request, { params }: { params?: { id: string } }) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  if (params?.id) {
    // Fetch one plan by ID
    const [rows] = await db.execute("SELECT * FROM plans WHERE id = ?", [params.id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Plan not found", response: "error" }, { status: 404 });
    }
    return NextResponse.json({ message: "Plan fetched successfully", response: "successful", plan: rows[0] });
  } else {
    // Fetch all plans
    const [rows] = await db.execute("SELECT * FROM plans");
    return NextResponse.json({ message: "Plans fetched successfully", response: rows, status: "successful" });
  }
}

export async function POST(req: Request) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const { name, duration_days, price } = await req.json();

  if (!name || !duration_days || !price) {
    return NextResponse.json(
      { message: "Name, duration (in days), and price are required", response: "error" },
      { status: 400 }
    );
  }

  try {
    const query = "INSERT INTO plans (name, duration_days, price) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [name, duration_days, price]);

    return NextResponse.json({
      message: "Plan created successfully",
      response: "successful",
      planId: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error creating plan", response: "error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const planId = params.id;
  const { name, duration_days, price } = await req.json();

  if (!name || !duration_days || !price) {
    return NextResponse.json(
      { message: "Name, duration (in days), and price are required", response: "error" },
      { status: 400 }
    );
  }

  try {
    const query = "UPDATE plans SET name = ?, duration_days = ?, price = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, duration_days, price, planId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Plan not found or not updated", response: "error" }, { status: 404 });
    }
    return NextResponse.json({ message: "Plan updated successfully", response: "successful" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating plan", response: "error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await authenticate(req, NextResponse);
  if (isAuthenticated !== true) {
    return isAuthenticated;
  }

  const planId = params.id;

  try {
    const query = "DELETE FROM plans WHERE id = ?";
    const [result] = await db.execute(query, [planId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Plan not found", response: "error" }, { status: 404 });
    }
    return NextResponse.json({ message: "Plan deleted successfully", response: "successful" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting plan", response: "error" }, { status: 500 });
  }
}
