import OutfitRecommendations from '../OutfitRecommendations';

export default function OutfitRecommendationsExample() {
  return <OutfitRecommendations onAddToLook={(item) => console.log('Added:', item)} />;
}
