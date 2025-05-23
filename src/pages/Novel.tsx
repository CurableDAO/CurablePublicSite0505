
import React from 'react';
import CommandHUDHeader from '@/components/CommandHUDHeader';
import CommandPatternBackground from '@/components/CommandPatternBackground';

const Novel = () => {
  // Google Form URL for novel cure submissions
  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSd4C1W9UXW5cF27y_Ny6RmA1Bc-RmNxq5k8YjglSuiU5nf1kA/viewform";
  
  return (
    <div className="container mx-auto px-4 py-16 pt-24 relative">
      {/* Background pattern specific to this page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CommandPatternBackground variant="matrix" intensity="medium" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-fade-up">
          <CommandHUDHeader 
            title="Novel Cure Application"
            subtitle="Innovation protocol initialized"
            statusText="NOVEL CURE SUBMISSION" 
            variant="secondary"
          />
          
          <div className="glass-panel p-6 mb-8">
            <p className="text-lg text-titanium-white/90 max-w-2xl">
              Have a breakthrough idea or compound? Pitch it here and tap into CurableDAO's collective power
              to validate, fund, and develop your innovation.
            </p>
          </div>
        </div>
        
        <div className="bg-graphite-700/30 rounded-lg overflow-hidden border border-graphite-700/60 shadow-lg animate-fade-up relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <CommandPatternBackground variant="grid" intensity="low" />
          </div>
          <iframe 
            src={`${formURL}?embedded=true`} 
            className="w-full h-[90vh] rounded-lg relative z-10"
            title="Novel Cure Application"
          />
        </div>
      </div>
    </div>
  );
};

export default Novel;
