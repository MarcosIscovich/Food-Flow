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
    type : string | number | boolean | string[] | File | File[] | Date | undefined | selectOption[];
    options?: selectOption[];
    ordenable?: boolean;
    label?: string;
  }