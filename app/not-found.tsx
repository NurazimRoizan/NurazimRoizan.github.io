import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Decor (Grid/Lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(var(--border) 2px, transparent 2px), linear-gradient(90deg, var(--border) 2px, transparent 2px)', backgroundSize: '64px 64px' }} />
      </div>

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10 mt-16 md:mt-0">
        
        {/* Massive 404 Block */}
        <div className="bg-destructive border-8 border-border shadow-brutal p-8 md:p-16 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter text-destructive-foreground leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="bg-card border-4 border-border shadow-brutal p-8 transform translate-x-2 md:translate-x-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            File Not Found
          </h2>
          <p className="text-lg md:text-xl font-bold uppercase tracking-widest text-muted-foreground mb-8">
            The data you are looking for has been deleted, moved, or never existed.
          </p>
          
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-lg border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            Return Home
          </Link>
        </div>

      </div>
    </div>
  )
}
