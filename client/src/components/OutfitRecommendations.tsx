import { outfitItems, type OutfitItem } from '@shared/mockData';
import OutfitCard from './OutfitCard';

interface OutfitRecommendationsProps {
  onAddToLook: (item: OutfitItem) => void;
}

export default function OutfitRecommendations({ onAddToLook }: OutfitRecommendationsProps) {
  const shoes = outfitItems.filter(item => item.category === 'shoes');
  const clothes = outfitItems.filter(item => item.category === 'clothes');
  const accessories = outfitItems.filter(item => item.category === 'accessories');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-3" data-testid="text-recommendations-title">
        Outfit Recommendations
      </h2>
      <p className="text-muted-foreground mb-12" data-testid="text-recommendations-subtitle">
        Select your favorite pieces to create the perfect athletic look
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-2xl font-semibold mb-6" data-testid="text-category-shoes">Shoes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoes.map(item => (
              <OutfitCard key={item.id} item={item} onAddToLook={onAddToLook} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6" data-testid="text-category-clothes">Apparel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clothes.map(item => (
              <OutfitCard key={item.id} item={item} onAddToLook={onAddToLook} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6" data-testid="text-category-accessories">Accessories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map(item => (
              <OutfitCard key={item.id} item={item} onAddToLook={onAddToLook} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
