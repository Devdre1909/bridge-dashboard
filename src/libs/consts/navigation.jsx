import applicationIcon from './application-icon.svg';
import applicationIcon2 from './application-icon2.svg';
import settingIcon from './setting-icon.svg';
import settingIcon2 from './setting-icon2.svg';
import logoutIcon from './logout-icon.svg';


export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: <img src={applicationIcon} alt="Application Icon" className="w-6 h-6" />,
    icon2: <img src={applicationIcon2} alt="Application Icon" className="w-6 h-6" />
  },
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <img src={settingIcon} alt="Setting Icon" className="w-6 h-6"/>,
    icon2: <img src={settingIcon2} alt="Setting Icon" className="w-6 h-6"/>,
  },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'logout',
    label: 'Logout',
    path: '/logout',
    icon: <img src={logoutIcon} alt="Logout Icon" className="w-6 h-6"/>,
  }
]