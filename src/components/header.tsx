import { Dumbbell } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center h-16 px-4 md:px-8 border-b border-border shrink-0">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold tracking-tighter text-foreground">
          MyFitFlow
        </h1>
      </div>
    </header>
  );
};

export default Header;
