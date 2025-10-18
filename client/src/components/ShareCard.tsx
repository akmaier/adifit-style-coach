import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import { useRef } from 'react';

interface ShareCardProps {
  userName: string;
  lookName: string;
  tryOnImageUrl: string;
  trainingDays: string[];
}

export default function ShareCard({ userName, lookName, tryOnImageUrl, trainingDays }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s Adifit Style`,
          text: `Check out my ${lookName} look and training plan!`,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };

  const handleDownload = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current);
        const link = document.createElement('a');
        link.download = `adifit-${lookName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div ref={cardRef} className="bg-background">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {userName}'s Athletic Style
            </h3>
            
            <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden mb-6">
              <img 
                src={tryOnImageUrl} 
                alt={`${lookName} virtual try-on`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Look:</p>
                <p className="font-semibold text-lg">{lookName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Training Days:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {trainingDays.map(day => (
                    <span key={day} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">Powered by Adifit Style Coach</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <Button 
          onClick={handleShare}
          data-testid="button-share-card"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share My Style
        </Button>
        <Button 
          variant="outline"
          onClick={handleDownload}
          data-testid="button-download-card"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
      </div>
    </div>
  );
}
