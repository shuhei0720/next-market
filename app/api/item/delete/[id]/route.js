import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  try {
    await connectDB();
    const params = await context.params;
    await ItemModel.deleteOne({ _id: params.id });
    return NextResponse.json({ message: "アイテム削除成功" });
  } catch (err) {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
