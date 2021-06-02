import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MyTasksWebPartStrings';
import MyTasks from './components/MyTasks';
import { IMyTasksProps } from './components/IMyTasksProps';
import { sp } from "@pnp/sp/presets/all";   

 

export interface IMyTasksWebPartProps {
  description: string;
  listName: string;
  listDropdown:string;
  selectedDropDownValue:string;
  viewDropdown:any;
}

export default class MyTasksWebPart extends BaseClientSideWebPart<IMyTasksWebPartProps> {

  protected onInit(): Promise < void > {  
    return super.onInit().then(_ => {  
        sp.setup({  
            spfxContext: this.context  
        });  
    });  
  } 

  private viewDropDownOptions: IPropertyPaneDropdownOption[];

  public render(): void {
    const element: React.ReactElement<IMyTasksProps> = React.createElement(
      MyTasks,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        listDropdown: this.properties.listDropdown,
        selectedDropDownValue: "",
        viewDropdown:this.properties.viewDropdown
      }
    );
      //console.log(this.properties.selectedList)
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected GetLists():Promise<any>{
    //return sp.web.lists.filter(‘Hidden eq false’).get().then((data) =>{
    return sp.web.lists.get().then((data) =>{
        console.log("Total number of lists are " + data.length);
      return data;
    });
  }

  protected listDropDownOptions: IPropertyPaneDropdownOption[];

  protected onPropertyPaneConfigurationStart():void{
    this.listDropDownOptions = [];
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');
    //loads list name into list dropdown 
    this.GetLists().then((response) =>{
      for(let i=0 ; i< response.length;i++){
        //nowpopulate the listdropdown array
        //console.log(response[i].Title);
        this.listDropDownOptions.push({key:response[i].Title,text:response[i].Title});
      }
      //this.listsDropdownDisabled = false;
      this.context.propertyPane.refresh();
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.render();
    });
  }
  
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('listDropdown', {
                  label: strings.listNameDropdownLabel,
                  options:this.listDropDownOptions,
                  //selectedKey?:this.properties.selected
                }),
                PropertyPaneTextField('listName', {
                  label: strings.listNameFieldLabel,
                  //value: this.properties.listDropdown
                }),
                PropertyPaneTextField('selectedDropDownValue', {
                  label: strings.selectedDropDownValueLabel,
                  value: this.properties.listDropdown
                }),
                PropertyPaneDropdown("viewDropdown",{
                  label:strings.SelectedView,
                  options:this.viewDropDownOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
