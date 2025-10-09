import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-background');
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          priority
          className="object-cover -z-10 opacity-20"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      {children}
    </div>
  );
}
