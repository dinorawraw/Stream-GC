import React, { useState } from 'react';

interface PreviewProps {
  lowerThird: {
    profilePicture: string;
    content: string;
    textColor: string;
    borderColor: string;
    boxColor: string;
    animation: string;
    fontFamily: string;
    fontSize: number;
    textStyle: {
      bold: boolean;
      italic: boolean;
      alignment: 'left' | 'center' | 'right';
      transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    };
  };
}

const Preview: React.FC<PreviewProps> = ({ lowerThird }) => {
  const [key, setKey] = useState(0);

  const getAnimationClass = () => {
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

  const resetAnimation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 w-full aspect-video rounded-lg relative overflow-hidden">
        <div key={key} className={`absolute bottom-8 left-8 flex items-center gap-4 ${getAnimationClass()}`}>
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
      <button
        onClick={resetAnimation}
        className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded flex items-center gap-2 justify-center transition-colors"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
        Test Animation
      </button>
    </div>
  );
}

export default Preview;