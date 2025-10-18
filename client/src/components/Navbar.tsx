import logo from '@assets/generated_images/Adifit_Style_Coach_logo_270417eb.png';

interface NavbarProps {
  userName?: string;
}

export default function Navbar({ userName }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-18">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Adifit Style Coach" className="h-12 w-12 object-contain" data-testid="img-logo" />
            <span className="text-xl font-bold tracking-tight" data-testid="text-app-name">
              Adifit Style Coach
            </span>
          </div>
          
          {userName && (
            <div className="text-sm text-muted-foreground" data-testid="text-greeting">
              👋 Hello, <span className="text-primary font-semibold">{userName}</span>!
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
