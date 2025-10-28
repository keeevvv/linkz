import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

import prisma from '@/lib/prisma';


console.log('Prisma instance:', prisma);


export default async function UserLinkPage(props: { params: { username: string } | Promise<{ username: string }> }) {
  const resolvedParams = await props.params;
  const { username } = resolvedParams;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      links: true,
    },
  });

  if (!user) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-muted/40 p-4 pt-12 md:pt-24">
      
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full shadow-lg"> 
          <CardHeader className="items-center text-center">
            
            <CardTitle className="text-2xl">
              {user.name}'s Links
            </CardTitle>
            <CardDescription>
              {user.bio || 'My Links'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              
              {user.links.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  This user hasn't added any links yet.
                </p>
              )}

              {user.links.map((link) => (
                <Button key={link.id} size="lg" className="w-full" asChild>
                  <Link
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}

            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

