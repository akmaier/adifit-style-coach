import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { OutfitItem } from '@shared/mockData';

interface OutfitCardProps {
  item: OutfitItem;
  onAddToLook?: (item: OutfitItem) => void;
  showAddButton?: boolean;
}

export default function OutfitCard({ item, onAddToLook, showAddButton = true }: OutfitCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-outfit-${item.id}`}>
      <div className="aspect-square overflow-hidden bg-card">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
          data-testid={`img-outfit-${item.id}`}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg" data-testid={`text-outfit-name-${item.id}`}>
            {item.name}
          </h3>
          <Badge variant="secondary" data-testid={`badge-price-${item.id}`}>
            ${item.price}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4" data-testid={`text-outfit-description-${item.id}`}>
          {item.description}
        </p>
        {showAddButton && onAddToLook && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onAddToLook(item)}
            data-testid={`button-add-to-look-${item.id}`}
          >
            Add to Look
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
