import React from 'react';
import SupportItem from './supportItme';
import WhatsappIcon from '@/assets/whatsapp.svg'
import support from '@/assets/support.svg'

interface SupportItemData {
  imageSrc: string;
  text: string;
}

const supportItems: SupportItemData[] = [
  {
    imageSrc: support,
    text: "Prelevels Support 24/7"
  },
  {
    imageSrc: WhatsappIcon,
    text: "WhatsApp community"
  }
];

const SeasonSale: React.FC = () => {
  return (
    <header className="flex flex-col text-xs text-neutral-600">
      <div className="flex flex-wrap gap-5 justify-between px-20 py-1.5 w-full bg-white max-md:px-5 max-md:max-w-full">
        <p className="my-auto">Season Sale: FLAT 20% OFF - Limited Time Only</p>
        <nav className="flex gap-8 items-center">
          {supportItems.map((item, index) => (
            <React.Fragment key={index}>
              <SupportItem imageSrc={item.imageSrc} text={item.text} />
              {index < supportItems.length - 1 && (
                <div className="shrink-0 self-stretch w-px border border-solid border-neutral-500 border-opacity-20 h-[29px]" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SeasonSale;

