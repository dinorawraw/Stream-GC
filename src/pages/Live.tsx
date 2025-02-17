import React, { useEffect, useState } from 'react';
import LivePreview from '../components/LivePreview';
import type { LowerThird } from '../types';

const Live = () => {
  const [lowerThird, setLowerThird] = useState<LowerThird | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textStyle = JSON.parse(params.get('textStyle') || '{}');
    
    setLowerThird({
      tweetUrl: '',
      content: params.get('content') || '',
      profilePicture: params.get('profilePicture') || '',
      textColor: params.get('textColor') || '#ffffff',
      borderColor: params.get('borderColor') || '#1d9bf0',
      boxColor: params.get('boxColor') || '#15202b',
      animation: params.get('animation') || 'slideIn',
      fontFamily: params.get('fontFamily') || 'Inter',
      fontSize: parseInt(params.get('fontSize') || '16', 10),
      textStyle: {
        bold: textStyle.bold || false,
        italic: textStyle.italic || false,
        alignment: textStyle.alignment || 'left',
        transform: textStyle.transform || 'none'
      }
    });
  }, []);

  if (!lowerThird) return null;

  return (
    <div className="fixed inset-0 bg-transparent">
      <LivePreview lowerThird={lowerThird} isPlaying={true} />
    </div>
  );
};

export default Live;