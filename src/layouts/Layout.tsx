import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Inline, Stack } from '../components';
import { colors } from '../components/colors';
import { getMappedIcon } from './NavIcons';

const Sidebar = styled.div`
  width: 250px;
  overflow: hidden;
  height: 100vw;
  background-color: ${colors.secondBase};
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Logo = styled.h2`
  margin: 0;
  cursor: pointer;
  padding: 44px 24px;
`;

const NavigationTitle = styled.h6`
  margin: 0;
  font-size: 14px;
  padding: 0px 24px;
  color: ${colors.secondary};
`;

const NavigationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionContainer = styled.div`
  display: flex;
  padding: 16px 24px;
  font-size: 16px;
  cursor: pointer;
  align-items: center;
  gap: 8px;
  border-width: 0px 0px 0px 3px;
  color: ${colors.secondary};
`;

type Navigation = {
  id: string;
  title: string;
  options: Array<Option>;
};

type Option = {
  id: string;
  path?: string;
  icon?: string;
  title: string;
};

const navigation: Navigation[] = [
  {
    id: 'menu',
    title: 'MENU',
    options: [
      { id: 'home', path: '/', icon: 'home', title: 'Home' },
      {
        id: 'discover',
        path: '/movies/discover',
        icon: 'bookmark',
        title: 'Discover',
      },
      {
        id: 'popular',
        path: '/movies/popular',
        icon: 'trending',
        title: 'Popular Movies',
      },
    ],
  },
  {
    id: 'other',
    title: 'OTHER',
    options: [
      { id: 'playlist', icon: 'document', title: 'Playlist' },
      { id: 'live', icon: 'play', title: 'Live' },
      { id: 'bookmark', icon: 'mail', title: 'Bookmarks' },
      {
        id: 'favorite',
        path: '/favorite',
        icon: 'bookmark',
        title: 'Favorite',
      },
    ],
  },
];

const activeBorderStyle = {
  background: '#2d2f3e',
  borderStyle: 'solid',
  borderColor: '#1885c8',
};

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Inline>
      <Sidebar as="nav">
        <Logo onClick={() => navigate('/')}>
          <span style={{ color: '#1885c8' }}>Mov</span>.time
        </Logo>
        <Stack gap={24} style={{ width: '100%' }}>
          {navigation.map(({ id, title, options }) => (
            <NavigationItemContainer key={id}>
              <NavigationTitle>{title}</NavigationTitle>
              <Stack gap={4}>
                {options?.length
                  ? options.map((option) => {
                      const isActive =
                        option.id === 'home' && pathname === '/search'
                          ? true
                          : pathname === option?.path;
                      return (
                        <OptionContainer
                          key={option.id}
                          onClick={() => navigate(option?.path || '/')}
                          style={
                            isActive
                              ? {
                                  ...activeBorderStyle,
                                  color: '#1885c8',
                                  fontWeight: 'bold',
                                }
                              : undefined
                          }
                        >
                          {option?.icon
                            ? getMappedIcon({
                                id: option.icon,
                                color: isActive
                                  ? colors.primary
                                  : colors.secondary,
                              })
                            : null}
                          {option.title}
                        </OptionContainer>
                      );
                    })
                  : null}
              </Stack>
            </NavigationItemContainer>
          ))}
        </Stack>
      </Sidebar>
      <MainContent as="main">
        <Outlet />
      </MainContent>
    </Inline>
  );
}
