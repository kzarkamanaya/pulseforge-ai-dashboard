interface Props {
  ticketCount: number;
}

export default function Header({ ticketCount }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-slate-800 border-b border-slate-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-black text-base">PF</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-100 font-bold text-lg leading-tight">
                PulseForge
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg leading-tight">
                Gaming
              </span>
            </div>
            <div className="text-slate-500 text-xs font-medium tracking-widest uppercase hidden sm:block">
              Support Command Center
            </div>
          </div>
        </div>

        {/* Status pills */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 rounded-full bg-slate-700 border border-slate-600 px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-slate-300 text-sm font-medium whitespace-nowrap">
              {ticketCount} Tickets
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-600/20 border border-blue-500/40 px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
            <span className="text-blue-300 text-sm font-medium whitespace-nowrap">
              AI Ready
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
