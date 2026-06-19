import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
}
