export interface TopbarProps {
  onMenuClick?: () => void;
  banner?: {
    id?: string;
    message: string;
    link?: string;
    linkText?: string;
  };
  onBannerVisibilityChange?: (visible: boolean) => void;
}

export interface IconProps {
  size?: number;
  className?: string;
}

