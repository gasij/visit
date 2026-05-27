import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { name, email, message } = body as Partial<Record<'name' | 'email' | 'message', unknown>>;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.trim().length < 5) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
  }

  const created = await prisma.contactMessage.create({
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    },
  });

  return NextResponse.json(created, { status: 201 });
}

