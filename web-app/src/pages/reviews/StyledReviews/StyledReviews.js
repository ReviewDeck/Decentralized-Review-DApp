import React from 'react';
import './StyledReviews.css';

class StyledReviews extends React.Component{
  state={
      reviewData: [],
      review: ''
  };
  handleEnter =(e)=>{
      e = e || window.event;
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      if(dd<10) {
          dd = '0'+dd
      }
      if(mm<10) {
          mm = '0'+mm
      }

      let t = mm + '/' + dd + '/' + yyyy;

      if(e.keyCode === 13)
      {
          let localArray=[];
          localArray[0]=({
              "content": document.getElementById("newCommentId").value,
              "time": today.getHours()+": "+today.getMinutes()+": "+today.getSeconds(),
              "date": t,
              "author":"sanket"
          });

          for(let i=1; i<=this.state.reviewData.length; i++) {
              localArray[i]=((this.state.reviewData)[i-1]);
          }

          this.setState({
              reviewData:localArray
          });

          document.getElementById("newCommentId").value="";
      }
  };

    linkSubmitted = async () => {
        const { review} = this.state;


        const response = await this.props.contract.addProductAndReview(this.props.match.params.product, this.props.url, Date.now(), 0, review, {from: this.props.accounts[0]})
        console.log(response);
        if(response.tx !== undefined) {
            console.log('transaction succesful')
        } else {
            this.setState({error: response})
        }
    }

render(){
    return(
           <div className="App">
               <div className="comment_block">
                    <div className="create_new_comment">
                       <div className="user_avatar">
                           <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg"/>
                       </div><div className="input_comment">
                       <input id="newCommentId" type="text" placeholder="Join the conversation.." value={this.state.review} onChange={(e) => this.setState({review: e.target.value})} />
                    </div>

                    <div className="empty-action pt-2 text-center pb-2" style={{marginBottom: '2rem'}}>
                        <button className="action-button shadow animate blue btn-lg col-mx-auto"q  onClick={this.linkSubmitted}>
                            Submit Review
                        </button>
                    </div>

                   </div>
                   {
                       this.props.data.map((review,i) =>
                           <div key={i} className="new_comment">
                               <ul className="user_comment">
                                   <div className="user_avatar">
                                       <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg"/>
                                   </div><div className="comment_body">
                                   <p>{review["content"]}</p>
                               </div>
                                   <div className="comment_toolbar">
                                       <div className="comment_details">
                                           <ul>
                                               {/*<li><i className="fa fa-clock-o"/>{obj["time"]}</li>*/}
                                               {/*<li><i className="fa fa-calendar"/>{review["date"]}</li>*/}
                                               {/*<li><i className="fa fa-pencil"/> <span className="user">{review["author"]}</span></li>*/}
                                           </ul>
                                       </div>
                                   </div>
                               </ul>
                           </div>
                       )
                   }
               </div>
           </div>
    );
  }
}
export default StyledReviews;