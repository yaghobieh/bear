/**
 * Social Icons - Social media and brand icons
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

export const GithubIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Icon>
);

export const TwitterIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></Icon>
);

export const XSocialIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-7-8.5L20 4h-2l-5 6.2L9 4H4z" /></Icon>
);

export const LinkedInIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Icon>
);

export const FacebookIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Icon>
);

export const InstagramIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Icon>
);

export const YoutubeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></Icon>
);

export const DiscordIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9.5 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /><path d="M14.5 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /><path d="M7.5 16.5s1.5 2 4.5 2 4.5-2 4.5-2" /><path d="M20.3 4.7a19.8 19.8 0 0 0-4.9-1.5l-.6 1.2a18.3 18.3 0 0 0-5.6 0L8.6 3.2a19.8 19.8 0 0 0-4.9 1.5A20 20 0 0 0 .2 17.8a20.2 20.2 0 0 0 6.1 3.1l1.4-2.2a13.1 13.1 0 0 1-2.1-1l.5-.4a14.2 14.2 0 0 0 12 0l.5.4c-.7.4-1.4.7-2.1 1l1.4 2.2a20.2 20.2 0 0 0 6.1-3.1A20 20 0 0 0 20.3 4.7z" /></Icon>
);

export const SlackIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14.5 2a2.5 2.5 0 0 0 0 5H17V4.5A2.5 2.5 0 0 0 14.5 2z" /><path d="M20 9.5a2.5 2.5 0 0 0-5 0V12h2.5A2.5 2.5 0 0 0 20 9.5z" /><path d="M9.5 22a2.5 2.5 0 0 0 0-5H7v2.5A2.5 2.5 0 0 0 9.5 22z" /><path d="M4 14.5a2.5 2.5 0 0 0 5 0V12H6.5A2.5 2.5 0 0 0 4 14.5z" /><path d="M17 14.5a2.5 2.5 0 0 1 5 0v2h-2.5a2.5 2.5 0 0 1-2.5-2.5h0z" /><path d="M14.5 17a2.5 2.5 0 0 1 0 5H12v-2.5a2.5 2.5 0 0 1 2.5-2.5z" /><path d="M7 9.5a2.5 2.5 0 0 1-5 0V7h2.5A2.5 2.5 0 0 1 7 9.5z" /><path d="M9.5 7a2.5 2.5 0 0 1 0-5H12v2.5A2.5 2.5 0 0 1 9.5 7z" /></Icon>
);

export const TwitchIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" /></Icon>
);

export const RedditIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="14" r="7" /><path d="M19 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M16.5 3l2 2" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /><path d="M9 17c1.5 1 4.5 1 6 0" /></Icon>
);

export const NpmIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="5" width="20" height="14" rx="0" /><path d="M5 8v8h4v-6h2v6h2V8" /><path d="M15 8v8h4V8h-2v6h-2V8" /></Icon>
);

export const ShareIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></Icon>
);

export const Share2Icon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 11 12 6 17 11" /><path d="M12 6v12" /><path d="M5 18h14" /></Icon>
);

export const HeartIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Icon>
);

export const ThumbsUpIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></Icon>
);

export const ThumbsDownIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 15V19a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" /><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></Icon>
);

export const AtSignIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></Icon>
);

export const HashIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></Icon>
);

export const RssIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></Icon>
);
