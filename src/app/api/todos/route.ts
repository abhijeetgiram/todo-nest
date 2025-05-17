import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  await connectToDB();
  const todos = await Todo.find({ userEmail: session.user.email });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  await connectToDB();
  const todo = await Todo.create({ ...body, userEmail: session.user.email });
  return NextResponse.json(todo, { status: 201 });
}
