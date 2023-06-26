export interface selectOption {
    value: number | string;
    label: string;
  }


export interface iTableFieldConfiguration {
    title: string;
    fieldName: string;
    hiddenInMobile: boolean;
    visibleInTable: boolean;
    defaultValue: any;
    type : string;
    options?: selectOption[];
    oredenable?: boolean;
  }