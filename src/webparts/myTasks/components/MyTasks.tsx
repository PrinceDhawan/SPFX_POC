import * as React from 'react';
import styles from './MyTasks.module.scss';
import { IMyTasksProps } from './IMyTasksProps';
import { IMyTasksState } from './IMyTasksState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from "@pnp/sp/webs";
import { RelatedItemManager, sp } from '@pnp/sp/presets/all';

export default class MyTasks extends React.Component<IMyTasksProps, IMyTasksState> {
  constructor(props: IMyTasksProps){
    super(props);
    this.state = {
      listData : []
    }
  }
  public render(): React.ReactElement<IMyTasksProps> {
    return (
      <div className={ styles.myTasks }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              {this.state.listData.map((item) => {
                console.log(item);
                return <div>
                  {item.Title}
                </div>
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  //private web = Web("https://sirisrdalabs.sharepoint.com/sites/libertymutual"); 
  public componentDidMount = () => {
    sp.web.lists.getByTitle(this.props.listDropdown).items().then((items) => {  
        this.setState({  
            listData: items  
        }); 
        console.log(items);
    }).catch((err) => {  
        console.log(err);  
    });  
} 
}
