import SuggestedLooks from '../SuggestedLooks';

export default function SuggestedLooksExample() {
  return <SuggestedLooks onTryOn={(look) => console.log('Try on:', look)} />;
}
