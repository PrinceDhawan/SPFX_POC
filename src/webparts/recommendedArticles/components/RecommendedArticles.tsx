import * as React from 'react';
import styles from './RecommendedArticles.module.scss';
import { IRecommendedArticlesProps } from './IRecommendedArticlesProps';
import { IRecommendedArticlesState } from './IRecommendedArticlesState';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all"; 

const UserInterestList = "UserInterestList";
export default class RecommendedArticles extends React.Component<IRecommendedArticlesProps, IRecommendedArticlesState> {
  constructor(props: IRecommendedArticlesProps){
    super(props);
    this.state = {
      userInterestCategories : []
    }
  }
  public render(): React.ReactElement<IRecommendedArticlesProps> {
    return (
      <div className={ styles.recommendedArticles }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              {this.state.userInterestCategories.map((item) => {
                //console.log(item);
                return <div>
                  {item}
                </div>
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount = () => {
    sp.web.currentUser.get().then(function(res){  
      var userEmail = res.Email;
      console.log(userEmail);
      sp.web.lists.getByTitle(UserInterestList).items
      .select("Title,User_x0020_Interests")
      .filter("Title eq '" + userEmail + "'")
      .get().then(function(results){
          let interests = results[0].User_x0020_Interests;
          console.log(interests);

          //calling next API call to retrieve pages library

          // sp.web.lists.getByTitle(UserInterestList).items
          // .select("Title,User_x0020_Interests")
          // .filter("Title eq '" + userEmail + "'")
          // .get().then(function(results){
          //     let interests = results[0].User_x0020_Interests;
          //     console.log(interests);
          //   });

          //Not working may be made some mistake
          
          // this.setState({
          //   userInterestCategories : interests})
          // });
        });


    // sp.web.lists.getByTitle(UserInterestList).items().then((items) => {  
    //     this.setState({  
    //       userEmailDetails: items  
    //     }); 
    //     //console.log(items);
    // }).catch((err) => {  
    //     console.log(err);  
    // });  
  } 

}
