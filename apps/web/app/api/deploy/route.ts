import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

type ResponseJson = {
  url: string;
  sqlSchema: string;
};

export async function POST(req: Request) {
  const { url, sqlSchema } = (await req.json()) as ResponseJson;
  if (url === "" || !sqlSchema) {
    return NextResponse.json(
      {
        error: "we couldn't find a conection URL or a SQL Schema. Please try again with the corret information.",
      },
      { status: 400 }
    );
  }
  const client = postgres(url, { prepare: false });
  const db = drizzle(client);

  console.log({url});
  console.log(sqlSchema);
  
  
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
  await db.execute(sql.raw(sqlSchema));

  return NextResponse.json({
    message: "Database schema deployed successfully",
  });
}
