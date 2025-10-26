import Link from 'next/link'; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button'; 


const mockPublicLinks = [
  {
    id: 1,
    title: 'Google.com',
    url: 'https://www.google.com',
  },
  {
    id: 2,
    title: 'Reddit.com',
    url: 'https://www.reddit.com/',
  },
  {
    id: 3,
    title: 'Shadcn',
    url: 'https://ui.shadcn.com',
  },
  {
    id: 4,
    title: 'My Favourite Browser',
    url: 'https://search.brave.com/',
  },
];

export default function LinksPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      
      
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-2xl">Lis of Links</CardTitle>
          <CardDescription>
            List semua public links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {mockPublicLinks.map((link) => (
              
              
              <Button key={link.id} size="lg" className="w-full" asChild>
                <Link
                  href={link.url}
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
    </main>
  );
}