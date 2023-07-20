import React from 'react'
import { DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../libs/consts/navigation'
import logo from './Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames'

export default function Sidebar() {
  return (
    <div className='bg-neutral-50 w-60 flex flex-col'>
      <div className="flex items-center px-5 py-3 w-60 h-20">
        <img
          src={logo}
          alt="Logo"
        />
      </div>


      <div className='flex-1 mt-7 flex-shrink-0'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-1">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarBottomLink item={item} />
        ))}
      </div>
    </div>
  )
}

function SidebarLink({ item }) {
  const location = useLocation();
  const isActive = location.pathname === item.path

const linkClass =
  'flex items-center gap-3 px-3 py-2 hover:bg-[#F2F2F3] hover:no-underline active:bg-[#F2F2F3] rounded-sm first:mb-3'
  return (
    <Link
      to={item.path}
      className={classNames(isActive ? 'bg-[#F2F2F3] text-[#161619] ml-1' : 'text-[#8A8A8D]', linkClass)}
    >
      {isActive ?
        (
          <>
            <span>{item.icon}</span>
            <span className='font-bold text-xl fw-700'>{item.label}</span>
          </>
        ) : (
          <>
            <span>{item.icon2}</span>
            <span className='font-bold text-xl fw-700'>{item.label}</span>
          </>
        )}
    </Link>
  );
}

function SidebarBottomLink({ item }) {
  const linkClass =
    'flex items-center gap-3 px-3 py-2 hover:bg-[#F2F2F3] hover:no-underline active:bg-[#F2F2F3] rounded-sm first:mb-3'

  return (
    <Link
      to={item.path}
      className={classNames('text-[#FF0000]', linkClass)}
    >
      <span>{item.icon}</span>
      <span className='font-bold text-xl fw-700'>{item.label}</span>
    </Link>
  );
}
