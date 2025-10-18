import VirtualTryOn from '../VirtualTryOn';
import heroImage from '@assets/generated_images/Hero_section_background_d4f96a5e.png';

export default function VirtualTryOnExample() {
  const mockResults = [
    {
      lookId: 'look-1',
      lookName: "Runner's Elite",
      imageUrl: heroImage
    },
    {
      lookId: 'look-2',
      lookName: 'Training Pro',
      imageUrl: heroImage
    },
    {
      lookId: 'look-3',
      lookName: 'Street Athlete',
      imageUrl: heroImage
    }
  ];

  return <VirtualTryOn results={mockResults} />;
}
