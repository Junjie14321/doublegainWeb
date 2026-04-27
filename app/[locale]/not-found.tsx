import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/en">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
