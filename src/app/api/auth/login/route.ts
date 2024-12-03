import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create a MySQL connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gym_management',
});

// Check if the connection is successful
db.ping().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.log('Database connection failed', error);
});

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const [results] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  
    if (results.length === 0) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    console.log(token);
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.log('Error executing query:', error);
    return NextResponse.json({ message: 'Error logging in', error }, { status: 500 });
  }
}
