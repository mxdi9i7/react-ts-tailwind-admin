import React, { Fragment } from 'react';
import {
  BookOpenIcon,
  BriefcaseIcon,
  ClockIcon,
  CogIcon,
  CurrencyDollarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { classNames } from '../../helpers/className';
import { Dialog, Transition } from '@headlessui/react';
import { useState } from '@hookstate/core';
import { globalSidebarOpen } from '../../state';
import { logoUrl } from '../../constants/assets';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

interface Props {}

const navigation = [
  { name: '控制台', href: '/', icon: HomeIcon },
  { name: '订单管理', href: '/orders', icon: ClockIcon },
  {
    name: '营业数额',
    href: '/financial',
    icon: CurrencyDollarIcon,
  },
  { name: '客户数据', href: '/customers', icon: UsersIcon },
  { name: '菜单管理', href: '/menu', icon: BookOpenIcon },
  {
    name: '员工管理',
    href: '/employees',
    icon: BriefcaseIcon,
  },
  { name: '餐厅设置', href: '/settings', icon: CogIcon },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

const Sidebar: React.FC<Props> = (props) => {
  const sidebarOpen = useState(globalSidebarOpen);
  const history = useHistory();
  return (
    <>
      <Transition.Root show={sidebarOpen.value} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 flex z-40 lg:hidden'
          open={sidebarOpen.value}
          onClose={() => sidebarOpen.set(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-yellow-700'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => sidebarOpen.set(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img className='h-8 w-auto' src={logoUrl} alt='logo' />
              </div>
              <nav
                className='mt-5 flex-shrink-0 h-full divide-y divide-yellow-800 overflow-y-auto'
                aria-label='Sidebar'
              >
                <div className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.href === history.location.pathname
                          ? 'bg-yellow-800 text-white'
                          : 'text-yellow-100 hover:text-white hover:bg-yellow-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={
                        item.href === history.location.pathname
                          ? 'page'
                          : undefined
                      }
                    >
                      <item.icon
                        className='mr-4 h-6 w-6 text-yellow-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='mt-6 pt-6'>
                  <div className='px-2 space-y-1'>
                    {secondaryNavigation.map((item) => (
                      <Link to={item.href} key={item.name}>
                        <a className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-yellow-100 hover:text-white hover:bg-yellow-600'>
                          <item.icon
                            className='mr-4 h-6 w-6 text-yellow-200'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow bg-yellow-700 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <h1 className='text-white font-normal tracking-wide'>
                Cloudonut Restaurants
              </h1>
            </div>
            <nav
              className='mt-5 flex-1 flex flex-col divide-y divide-yellow-800 overflow-y-auto'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.href === history.location.pathname
                        ? 'bg-yellow-800 text-white'
                        : 'text-yellow-100 hover:text-white hover:bg-yellow-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={
                      item.href === history.location.pathname
                        ? 'page'
                        : undefined
                    }
                  >
                    <item.icon
                      className='mr-4 h-6 w-6 text-yellow-200'
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='mt-6 pt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-yellow-100 hover:text-white hover:bg-yellow-600'
                    >
                      <item.icon
                        className='mr-4 h-6 w-6 text-yellow-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
