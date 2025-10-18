import OutfitCard from '../OutfitCard';
import { outfitItems } from '@shared/mockData';

export default function OutfitCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <OutfitCard 
        item={outfitItems[0]} 
        onAddToLook={(item) => console.log('Added to look:', item)} 
      />
    </div>
  );
}
