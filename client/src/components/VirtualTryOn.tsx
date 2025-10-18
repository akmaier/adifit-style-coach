import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface TryOnResult {
  lookId: string;
  lookName: string;
  imageUrl: string;
}

interface VirtualTryOnProps {
  results: TryOnResult[];
  isLoading?: boolean;
}

export default function VirtualTryOn({ results, isLoading = false }: VirtualTryOnProps) {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Adifit Style',
          text: 'Check out my athletic style!',
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      console.log('Share not supported, falling back to download');
    }
  };

  const handleDownload = () => {
    console.log('Download triggered for result:', selectedResult);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" data-testid="loader-try-on" />
          <p className="text-lg text-muted-foreground">Generating your virtual try-on images...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-3" data-testid="text-virtual-tryon-title">
        Your Virtual Try-On Results
      </h2>
      <p className="text-muted-foreground mb-12" data-testid="text-virtual-tryon-subtitle">
        See how each look appears on you - compare side-by-side
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {results.map(result => (
          <Card 
            key={result.lookId} 
            className={`overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedResult === result.lookId ? 'ring-2 ring-primary' : 'hover-elevate'
            }`}
            onClick={() => setSelectedResult(result.lookId)}
            data-testid={`card-tryon-result-${result.lookId}`}
          >
            <CardHeader>
              <CardTitle className="text-lg" data-testid={`text-tryon-look-name-${result.lookId}`}>
                {result.lookName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-card overflow-hidden">
                <img 
                  src={result.imageUrl} 
                  alt={`Try-on result for ${result.lookName}`}
                  className="w-full h-full object-cover"
                  data-testid={`img-tryon-result-${result.lookId}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={handleShare}
          data-testid="button-share-results"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        <Button 
          variant="outline"
          onClick={handleDownload}
          disabled={!selectedResult}
          data-testid="button-download-result"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Selected
        </Button>
      </div>
    </div>
  );
}
