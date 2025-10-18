import heroImage from '@assets/generated_images/Hero_section_background_d4f96a5e.png';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" data-testid="text-hero-title">
          Elevate Your Athletic Style
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl" data-testid="text-hero-subtitle">
          Discover your perfect Adidas-inspired look with AI-powered virtual try-on and get a personalized training plan tailored to your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="group"
            data-testid="button-get-started"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-background/50 backdrop-blur-sm"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
