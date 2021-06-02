declare interface IMyTasksWebPartStrings {
  SelectedView: any;
  ListTitle: any;
  ListInformationGroup: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  listNameFieldLabel: string;
  listNameDropdownLabel: string;
  selectedDropDownValueLabel:string;
  SelectedView:string;
}

declare module 'MyTasksWebPartStrings' {
  const strings: IMyTasksWebPartStrings;
  export = strings;
}
