import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const navLinks = [
  { href: '#team', label: 'Команда' },
  { href: '#magicbento', label: 'Способности' },
  { href: '#projects', label: 'Проекты' },
  { href: '#articles', label: 'Статьи' },
  { href: '#calculator', label: 'Стоимость' },
  { href: '#contact', label: 'Контакты' },
];

const staggeredMenuItems = navLinks.map(({ href, label }) => ({
  label,
  ariaLabel: `Перейти: ${label}`,
  link: href,
}));

const staggeredSocialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com' },
  { label: 'Telegram', link: 'https://t.me' },
];

const Header: React.FC = () => {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={staggeredMenuItems}
      socialItems={staggeredSocialItems}
      displaySocials
      displayItemNumbering
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen
      colors={['#1a1224', '#2a1f3d', '#3d2d5c', '#5227FF']}
      logoHref="#"
      accentColor="#5227FF"
      socialSectionTitle="Соцсети"
      toggleLabels={{ open: 'Меню', close: 'Закрыть' }}
    />
  );
};

export default Header;
