import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

// Ergaa haaraa database keessatti galmeessuuf (POST)
export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, text } = await request.json();

    if (!name || !text) {
      return NextResponse.json(
        { error: "Maaloo maqaa fi ergaa guutaa!" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({ name, text });
    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gara database erguun hin danda'amne: " + error.message },
      { status: 500 }
    );
  }
}

// Ergaawwan jiran hunda database keessaa fiduuf (GET)
export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Data fiduun hin danda'amne: " + error.message },
      { status: 500 }
    );
  }
}

