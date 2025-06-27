import { NextRequest, NextResponse } from "next/server";
import formidable, { File, Files, Fields } from "formidable";
import path from "path";
import { pool } from "@/lib/db.js";
import { IncomingHttpHeaders, IncomingMessage } from "http";
import { Readable } from "stream";

// Disable Next.js built-in body parser for file uploads
export const config = {
  api: { bodyParser: false },
};

// Helper: Convert NextRequest to Node.js-readable stream
function nextRequestToIncomingMessage(req: NextRequest): IncomingMessage {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Request body is not readable.");

  const stream = new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });

  // Create a partial IncomingMessage with required properties
  const fakeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()) as IncomingHttpHeaders,
    method: req.method,
    url: req.url,
  });

  return fakeReq as IncomingMessage;
}

async function handleMultipart(req: NextRequest) {
  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), "/public/uploads"),
    keepExtensions: true,
  });

  const fakeIncomingReq = nextRequestToIncomingMessage(req);

  const [fields, files]: [Fields, Files] = await new Promise(
    (resolve, reject) => {
      form.parse(fakeIncomingReq, (err, fields, files) =>
        err ? reject(err) : resolve([fields, files])
      );
    }
  );

  console.log("PROFILE MULTIPART FIELDS:", fields);
  console.log("PROFILE MULTIPART FILES:", files);

  const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
  if (!email) throw new Error("Email is required");

  // avatar upload
  const avatarFile =
    files.avatar && Array.isArray(files.avatar)
      ? files.avatar[0]
      : (files.avatar as File | undefined);

  if (avatarFile?.newFilename) {
    const photoPath = `/uploads/${avatarFile.newFilename}`;
    console.log("Updating fotoUser to:", photoPath);
    await pool.execute("UPDATE users SET fotoUser = ? WHERE email = ?", [
      photoPath,
      email,
    ]);
  }

  const newUsername = Array.isArray(fields.newUsername)
    ? fields.newUsername[0]
    : fields.newUsername;

  if (typeof newUsername === "string" && newUsername.trim()) {
    console.log("Updating username to:", newUsername.trim());
    await pool.execute("UPDATE users SET username = ? WHERE email = ?", [
      newUsername.trim(),
      email,
    ]);
  }

  const newPhone = Array.isArray(fields.newPhone)
    ? fields.newPhone[0]
    : fields.newPhone;

  if (typeof newPhone === "string" && newPhone.trim()) {
    console.log("Updating noTelp to:", newPhone.trim());
    await pool.execute("UPDATE users SET noTelp = ? WHERE email = ?", [
      newPhone.trim(),
      email,
    ]);
  }

  return { message: "Profile updated successfully" };
}

async function handleJson(req: NextRequest) {
  const body = await req.json();
  console.log("PROFILE JSON BODY:", body);
  const { email, newUsername, newPhone } = body as {
    email?: string;
    newUsername?: string;
    newPhone?: string;
  };

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  if (newUsername?.trim()) {
    console.log("Updating username (JSON) to:", newUsername.trim());
    await pool.execute("UPDATE users SET username = ? WHERE email = ?", [
      newUsername.trim(),
      email,
    ]);
  }

  if (newPhone?.trim()) {
    console.log("Updating noTelp (JSON) to:", newPhone.trim());
    await pool.execute("UPDATE users SET noTelp = ? WHERE email = ?", [
      newPhone.trim(),
      email,
    ]);
  }

  return { message: "Profile updated successfully" };
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    console.log("CONTENT-TYPE:", contentType);

    const result = contentType.includes("multipart/form-data")
      ? await handleMultipart(req)
      : await handleJson(req);

    return NextResponse.json(result);
  } catch (err) {
    const error = err as Error;
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

interface UserRow {
  username: string;
  fotoUser: string;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    console.log("PROFILE GET email:", email);
    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const [rows] = (await pool.query(
      "SELECT username, fotoUser FROM users WHERE email = ? LIMIT 1",
      [email]
    )) as [UserRow[], unknown];

    if (!rows.length)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { username, fotoUser } = rows[0];
    return NextResponse.json({ username, photo: fotoUser });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
