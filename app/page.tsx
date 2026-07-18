import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)]" />
      
      <main className="relative z-10 max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm text-blue-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Production Blueprint Architecture v1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Aazan AI
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Unified Multi-Agent workspace orchestration layer executing over OpenAI, Anthropic, Gemini, DeepSeek, and Mistral infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl font-medium shadow-lg shadow-blue-600/20 text-center"
          >
            Launch System Workspace
          </Link>
          <Link 
            href="/register" 
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors rounded-xl font-medium text-center"
          >
            Create Architecture Identity
          </Link>
        </div>
      </main>
    </div>
  );
}
