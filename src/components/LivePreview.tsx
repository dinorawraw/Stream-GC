import React, { useEffect, useState } from 'react';
import type { LowerThird } from '../types';

interface LivePreviewProps {
  lowerThird: LowerThird;
  isPlaying: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({ lowerThird, isPlaying }) => {
  const [showContent, setShowContent] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isPlaying) {
      setShowContent(true);
      setAnimationClass(getAnimationClass('enter'));
      
      // Schedule exit animation
      const exitTimer = setTimeout(() => {
        setAnimationClass(getAnimationClass('exit'));
        
        // Hide content after exit animation
        const hideTimer = setTimeout(() => {
          setShowContent(false);
        }, lowerThird.exitDuration * 1000);
        
        return () => clearTimeout(hideTimer);
      }, 5000); // Show for 5 seconds before exit
      
      return () => clearTimeout(exitTimer);
    } else {
      setShowContent(false);
      setAnimationClass('');
    }
  }, [isPlaying, lowerThird.animation, lowerThird.exitAnimation]);

  const getAnimationClass = (type: 'enter' | 'exit') => {
    if (type === 'enter') {
      switch (lowerThird.animation) {
        case 'slideIn':
          return 'animate-slide-in';
        case 'fadeIn':
          return 'animate-fade-in';
        case 'bounceIn':
          return 'animate-bounce-in';
        case 'scaleIn':
          return 'animate-scale-in';
        default:
          return '';
      }
    } else {
      switch (lowerThird.exitAnimation) {
        case 'slideOut':
          return 'animate-slide-out';
        case 'fadeOut':
          return 'animate-fade-out';
        case 'bounceOut':
          return 'animate-bounce-out';
        case 'scaleOut':
          return 'animate-scale-out';
        default:
          return '';
      }
    }
  };

  const getTextStyles = () => {
    const { textStyle } = lowerThird;
    return {
      fontWeight: textStyle.bold ? 'bold' : 'normal',
      fontStyle: textStyle.italic ? 'italic' : 'normal',
      textAlign: textStyle.alignment,
      textTransform: textStyle.transform,
    };
  };

  if (!showContent) return null;

  return (
    <div className="w-full h-full">
      <div 
        className={`flex items-center gap-4 ${animationClass}`}
        style={{
          '--animation-duration': `${lowerThird.animationDuration}s`,
          '--exit-duration': `${lowerThird.exitDuration}s`
        } as React.CSSProperties}
      >
        <img
          src={lowerThird.profilePicture}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2"
          style={{ borderColor: lowerThird.borderColor }}
        />
        <div
          className="max-w-md rounded-lg p-4"
          style={{
            backgroundColor: lowerThird.boxColor,
            borderColor: lowerThird.borderColor,
            borderWidth: '2px',
            color: lowerThird.textColor,
            fontFamily: lowerThird.fontFamily,
            fontSize: `${lowerThird.fontSize}px`,
            ...getTextStyles()
          }}
        >
          <p>{lowerThird.content}</p>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;