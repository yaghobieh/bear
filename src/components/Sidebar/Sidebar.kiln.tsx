import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { HomeIcon, SettingsIcon, UsersIcon, InfoIcon } from '../Icon';
import type { SidebarItem } from './Sidebar.types';

export default {
  title: 'Navigation/Sidebar',
  description: 'Collapsible navigation sidebar with nested items and customizable styling.',
  stories: {
    Default: {
      render: () => {
        const items: SidebarItem[] = [
          { id: 'home', label: 'Home', icon: <HomeIcon size={18} /> },
          { id: 'users', label: 'Users', icon: <UsersIcon size={18} /> },
          { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
          { id: 'about', label: 'About', icon: <InfoIcon size={18} /> },
        ];
        const [active, setActive] = useState('home');

        return (
          <div className="bear-h-96 bear-border bear-rounded-lg bear-overflow-hidden">
            <Sidebar
              items={items}
              activeItemId={active}
              onItemClick={(item) => setActive(item.id)}
              header={<span className="bear-font-bold bear-text-lg">My App</span>}
            />
          </div>
        );
      },
    },
    Collapsible: {
      render: () => {
        const items: SidebarItem[] = [
          { id: 'home', label: 'Home', icon: <HomeIcon size={18} /> },
          { id: 'users', label: 'Users', icon: <UsersIcon size={18} /> },
          { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
        ];
        const [collapsed, setCollapsed] = useState(false);
        const [active, setActive] = useState('home');

        return (
          <div className="bear-h-96 bear-border bear-rounded-lg bear-overflow-hidden">
            <Sidebar
              items={items}
              collapsed={collapsed}
              onCollapsedChange={setCollapsed}
              activeItemId={active}
              onItemClick={(item) => setActive(item.id)}
              header={<span className="bear-font-bold">Logo</span>}
            />
          </div>
        );
      },
    },
    Nested: {
      render: () => {
        const items: SidebarItem[] = [
          { id: 'home', label: 'Home', icon: <HomeIcon size={18} /> },
          { 
            id: 'settings', 
            label: 'Settings', 
            icon: <SettingsIcon size={18} />,
            children: [
              { id: 'profile', label: 'Profile' },
              { id: 'security', label: 'Security' },
              { id: 'notifications', label: 'Notifications' },
            ],
          },
        ];
        const [active, setActive] = useState('home');

        return (
          <div className="bear-h-96 bear-border bear-rounded-lg bear-overflow-hidden">
            <Sidebar
              items={items}
              activeItemId={active}
              onItemClick={(item) => setActive(item.id)}
            />
          </div>
        );
      },
    },
    Variants: {
      render: () => {
        const items: SidebarItem[] = [
          { id: 'home', label: 'Home' },
          { id: 'users', label: 'Users' },
        ];

        return (
          <div className="bear-flex bear-gap-4 bear-h-64">
            <Sidebar items={items} variant="default" header="Default" />
            <Sidebar items={items} variant="bordered" header="Bordered" />
            <Sidebar items={items} variant="floating" header="Floating" />
          </div>
        );
      },
    },
  },
};



