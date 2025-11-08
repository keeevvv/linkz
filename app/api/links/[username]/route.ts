import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET handler to fetch public links for a specific user.
 * This is a public API endpoint.
 */
export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Find the user and include their links
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        links: {
          // Only get links that are marked as visible
          where: {
            visible: true,
          },
          // Order them by their position, if it exists
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    // Handle user not found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Successfully return just the links
    return NextResponse.json(user.links);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}