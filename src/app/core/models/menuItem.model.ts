export interface MenuItem {
  url: string;
  title: string;
  icon: string;
  permissions: string[];
  hidden?: boolean;
}
