
import React from 'react';
import { formatHaikuDescription } from '@/utils/profileStyles';

interface ProfileBioProps {
  bio?: string;
  gptDescription?: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio, gptDescription }) => {
  if (!bio && !gptDescription) return null;
  
  // Get formatted sentences from the utility function
  const formattedSentences = gptDescription ? formatHaikuDescription(gptDescription) : null;
  
  return (
    <div className="py-2 border-t border-graphite-700/30">
      {gptDescription && (
        <p className="text-titanium-white/90 text-sm italic">
          {formattedSentences?.map((sentence, i) => (
            <React.Fragment key={i}>
              {sentence}
              {i < formattedSentences.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      )}
      
      {bio && !gptDescription && (
        <p className="text-titanium-white/80 text-sm max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1">
          {bio}
        </p>
      )}
    </div>
  );
};

export default ProfileBio;
