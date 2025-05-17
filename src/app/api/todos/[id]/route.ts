import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

// PUT /api/todos/[id]
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 401 });
    }

    await connectToDB();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update TODO" },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id]
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 401 });
    }

    await connectToDB();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete TODO" },
      { status: 500 }
    );
  }
}
