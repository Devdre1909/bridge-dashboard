import React, { Fragment } from 'react'
import notificationIcon from './Notifications.svg';
import { Menu, Popover, Transition } from '@headlessui/react'
import { useNavigate, useLocation  } from 'react-router-dom'
import classNames from 'classnames'
import { DASHBOARD_SIDEBAR_LINKS } from '../../libs/consts/navigation';

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation();

  return (
    <div className='bg-[#F2F2F3] h-20 flex justify-between items-center border-b border-gray-200 pt-6 pb-6'>
      <div className='text-black font-bold text-3xl ml-5'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => {
          if (location.pathname === item.path) {
            return <div>{item.label}</div>;
          }
          return null;
        })}
      </div>

      <div className='flex items-center gap-2 mr-5'>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100',
                  'group inline-flex items-center rounded-sm p-1.5 text-black hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                )}
              >
                <div>
                  <img src={notificationIcon}
                    alt='notification icon' />
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-black font-medium">Messages</strong>
                    <div className="mt-2 py-1 text-sm">This is messages panel.</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>


        <div className='flex justify-between items-center gap-2'>

          <Menu as="div" className="relative">
            <div className="flex items-center"> 
              <Menu.Button className="ml-2 flex text-sm rounded-full">
                <span className="sr-only">Open user menu</span>
                <div
                  className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                />
                <span className='text-base font-bold ml-2 mt-2'>Sam Gandhi</span> 
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate('/profile')}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-[#F2F2F3] rounded-sm px-4 py-2 text-black cursor-pointer focus:bg-[#F2F2F3]'
                      )}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate('/settings')}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-[#F2F2F3] rounded-sm px-4 py-2 text-black cursor-pointer focus:bg-[#F2F2F3]'
                      )}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-[#F2F2F3] rounded-sm px-4 py-2 text-black cursor-pointer focus:bg-[#F2F2F3]'
                      )}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
