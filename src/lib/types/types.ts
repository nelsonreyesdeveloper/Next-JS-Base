export interface Page {
  id: string;
  title: string;
  description: string;
  slug: string;
  layoutType: string;
  sections: SectionProps[];
}

export interface SectionProps {
  id: string;
  __component: string;
  identifier: string;
  bgColor: string;
  image: Array<{}>;
  headline: Array<{}>;
  paragraph: Array<{}>;
  button: Array<{}>;
  layoutType: string;
}
