import { FC, useState } from 'react';

import { Menu, Plus } from 'lucide-react';

export const Sidebar: FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const switchSidebar = () => setIsSidebarExpanded((prevState) => !prevState);

  return (
    <div
      className={`flex flex-shrink-0 flex-col bg-[#282a2c] p-4 text-white transition-all duration-150
        ${isSidebarExpanded ? 'w-56' : 'w-20'}`}
    >
      <div
        onClick={switchSidebar}
        className='inline-flex hover:bg-neutral-700 mb-12 p-2 rounded-full max-w-max transition-colors duration-150 cursor-pointer'
      >
        <Menu className='w-6 h-6 text-neutral-200' />
      </div>

      <div className='inline-flex items-center hover:bg-neutral-700 p-2 rounded-full max-w-max text-neutral-200 transition-all duration-150 cursor-pointer'>
        <Plus className='flex-shrink-0 w-6 h-6' />
        <span
          className={`flex-shrink-0 text-sm transition-all overflow-hidden whitespace-nowrap duration-150
            ${isSidebarExpanded ? 'w-16 ml-3' : 'w-0'}`}
        >
          New chat
        </span>
      </div>
    </div>
  );
};
