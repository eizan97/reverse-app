import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

type ResponseJson = {
  url: string;
  sqlschema: string;
};

export async function POST(req: Request) {
  const { url, sqlschema } = (await req.json()) as ResponseJson;
  console.log(sqlschema);
  if (url === "") {
    return NextResponse.json(
      {
        error: "we couldn't find a conection URL. Please try again with the corret connection URL.",
      },
      { status: 400 }
    );
  }
  const client = postgres(url, { prepare: false });
  const db = drizzle(client);

  try {
    await db.execute(sql`SELECT NOW()`);
  } catch (error) {
    let message = error.code;
    if (message === "SASL_SIGNATURE_MISMATCH") {
      message = "Database password is missing.";
    } else if (message === "ENOTFOUND") {
      message = "your connection URL is invalid. please double-check it and make the necessary corrections.";
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
  await db.execute(sql.raw(sqlschema));

  return NextResponse.json({
    message: "Database schema deployed successfully",
  });
}
