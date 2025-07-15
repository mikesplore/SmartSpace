
import * as React from 'react';

export interface ReactImageGalleryItem {
  original: string;
  thumbnail?: string;
  description?: string;
  originalClass?: string;
  thumbnailClass?: string;
  renderItem?: () => React.ReactNode;
  renderThumbInner?: () => React.ReactNode;
  originalAlt?: string;
  thumbnailAlt?: string;
  embedUrl?: string;
  renderCustomControls?: () => React.ReactNode;
  bulletClass?: string;
  originalTitle?: string;
  thumbnailTitle?: string;
}

export interface ReactImageGalleryProps {
  items: ReactImageGalleryItem[];
  showThumbnails?: boolean;
  showFullscreenButton?: boolean;
  showPlayButton?: boolean;
  showNav?: boolean;
  showBullets?: boolean;
  showIndex?: boolean;
  autoPlay?: boolean;
  slideInterval?: number;
  slideDuration?: number;
  onSlide?: (currentIndex: number) => void;
  onScreenChange?: (fullScreenElement: HTMLElement | null) => void;
  onPause?: (currentIndex: number) => void;
  onPlay?: (currentIndex: number) => void;
  onClick?: (event: React.MouseEvent) => void;
  onImageLoad?: (event: React.SyntheticEvent) => void;
  onImageError?: (event: React.SyntheticEvent) => void;
  onThumbnailError?: (event: React.SyntheticEvent) => void;
  renderCustomControls?: () => React.ReactNode;
  renderLeftNav?: (onClick: React.MouseEventHandler, disabled: boolean) => React.ReactNode;
  renderRightNav?: (onClick: React.MouseEventHandler, disabled: boolean) => React.ReactNode;
  renderPlayPauseButton?: (onClick: React.MouseEventHandler, isPlaying: boolean) => React.ReactNode;
  renderFullscreenButton?: (onClick: React.MouseEventHandler, isFullscreen: boolean) => React.ReactNode;
  renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
  renderThumbInner?: (item: ReactImageGalleryItem) => React.ReactNode;
  additionalClass?: string;
  useBrowserFullscreen?: boolean;
  disableThumbnailScroll?: boolean;
  disableKeyDown?: boolean;
  flickThreshold?: number;
  startIndex?: number;
  lazyLoad?: boolean;
  thumbnailPosition?: 'top' | 'bottom' | 'left' | 'right';
  useTranslate3D?: boolean;
  isRTL?: boolean;
  preventDefaultTouchmoveEvent?: boolean;
  stopPropagation?: boolean;
  indexSeparator?: string;
  slideOnThumbnailOver?: boolean;
  swipingTransitionDuration?: number;
  onBeforeSlide?: (currentIndex: number) => void;
}

declare class ImageGallery extends React.Component<ReactImageGalleryProps> {}

export default ImageGallery;