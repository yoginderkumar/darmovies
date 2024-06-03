import {
  BookmarkIcon,
  DocumentIcon,
  HomeIcon,
  MailIcon,
  PlayCircleIcon,
  TrendingIcon,
  WalletIcon,
} from '../components/Icons';

export function getMappedIcon({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'home':
      return <HomeIcon color={color} />;
    case 'bookmark':
      return <BookmarkIcon color={color} />;
    case 'wallet':
      return <WalletIcon />;
    case 'play':
      return <PlayCircleIcon color={color} />;
    case 'document':
      return <DocumentIcon color={color} />;
    case 'mail':
      return <MailIcon color={color} />;
    case 'trending':
      return <TrendingIcon color={color} />;
    default:
      return null;
  }
}
