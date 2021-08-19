export interface IMenuItem {
  id: string;
  value: string;
  disabled?: boolean;
}

export interface IMenu {
  name: string;
  menu: IMenuItem[];
}

export interface IData {
  menus: IMenu[];
  rules: {
    [key: string]: number[];
  };
}
