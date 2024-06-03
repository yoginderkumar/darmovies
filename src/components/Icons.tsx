import './style.css';
import { colors } from './colors';

type IconProps = {
  size?: number;
  color?: string;
};

function Icon({
  viewBox,
  size = 24,
  color = colors.secondary,
  children,
  className,
}: IconProps & {
  viewBox?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${size}px`}
      viewBox={viewBox || '0 -960 960 960'}
      width={`${size}px`}
      fill={color}
      className={className}
    >
      {children}
    </svg>
  );
}

export function HomeIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </Icon>
  );
}

export function BookmarkIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
    </Icon>
  );
}

export function WalletIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
    </Icon>
  );
}

export function PlayCircleIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </Icon>
  );
}

export function DocumentIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
    </Icon>
  );
}

export function MailIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
    </Icon>
  );
}

export function TrendingIcon({ ...props }: IconProps) {
  return (
    <Icon {...props}>
      <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
    </Icon>
  );
}

export function SpinnerIcon({ ...props }: IconProps) {
  return (
    <Icon {...props} className="icon spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={props?.color || 'currentColor'}
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        stroke={props?.color || 'currentColor'}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </Icon>
  );
}
