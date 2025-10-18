import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { suggestedLooks, type SuggestedLook } from '@shared/mockData';

interface SuggestedLooksProps {
  onTryOn: (look: SuggestedLook) => void;
}

export default function SuggestedLooks({ onTryOn }: SuggestedLooksProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-bold" data-testid="text-suggested-looks-title">
          Suggested Looks
        </h2>
      </div>
      <p className="text-muted-foreground mb-12" data-testid="text-suggested-looks-subtitle">
        Complete outfits curated just for you - try them on virtually
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suggestedLooks.map(look => (
          <Card key={look.id} className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-look-${look.id}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle data-testid={`text-look-name-${look.id}`}>{look.name}</CardTitle>
                <Badge variant="secondary" className="text-base" data-testid={`badge-total-price-${look.id}`}>
                  ${look.totalPrice}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-lg overflow-hidden bg-card">
                  <img 
                    src={look.shoes.image} 
                    alt={look.shoes.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-look-shoes-${look.id}`}
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-card">
                  <img 
                    src={look.clothes.image} 
                    alt={look.clothes.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-look-clothes-${look.id}`}
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-card">
                  <img 
                    src={look.accessories.image} 
                    alt={look.accessories.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-look-accessories-${look.id}`}
                  />
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shoes:</span>
                  <span className="font-medium" data-testid={`text-look-shoes-name-${look.id}`}>{look.shoes.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Apparel:</span>
                  <span className="font-medium" data-testid={`text-look-clothes-name-${look.id}`}>{look.clothes.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accessory:</span>
                  <span className="font-medium" data-testid={`text-look-accessory-name-${look.id}`}>{look.accessories.name}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => onTryOn(look)}
                data-testid={`button-try-on-${look.id}`}
              >
                Try On This Look
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
