export interface StoryColorToken {
  name: string;
  variable: string;
  value: string;
}

export interface StoryColorGroup {
  title: string;
  tokens: StoryColorToken[];
}
