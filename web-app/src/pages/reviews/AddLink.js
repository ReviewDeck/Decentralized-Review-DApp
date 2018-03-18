import React from 'react'
import MicroLinkCard from 'react-microlink'
import './AddLink.css'
import {AppNavigation} from "../../components/navigation/AppNavigation";
import ReactStars from 'react-stars'

class AddLink extends React.Component {
    state = {
        link: '',
        review: '',
        loadLinkPreview: false,
        rating: 0
    }

    inputChanged = (e) => {
        this.setState({link: e.target.value}, () => {
            this.setState({loadLinkPreview: this.validURL(this.state.link)})
        })
    }

    linkSubmitted = async () => {
        const {link, review, rating} = this.state;

        const response = await this.props.contract.addProductAndReview(link, link, Date.now(), rating, review, {from: this.props.accounts[0]})
        console.log(response);
    }

    validURL = (str) => {
        let pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!pattern.test(str)) {
            console.log("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }

    render() {
        const {link, review, loadLinkPreview} = this.state;
        const disabled = link === "" || review === "";
        return (
            <div style={{backgroundColor: '#7E57C2'}}>
                <AppNavigation />
                <div className="Wrapper col-mx-auto">
                    <div className="Input">
                        <input type="text" id="input" className="Input-text"
                               placeholder="Add Link to the Product you want to Review"
                               value={this.state.link}
                               onChange={(e) => this.inputChanged(e)}
                        />
                        <label htmlFor="input" className="Input-label">Add Link</label>
                    </div>
                    {
                        loadLinkPreview && link !== ""
                            ?
                            <MicroLinkCard
                                url={this.state.link}
                                style={{margin: '10px auto'}}
                                target="_blank"
                            />
                            : null

                    }
                    <div className="stars Input pl-2 pt-2 col-mx-auto d-flex" style={{ justifyContent:'start', alignItems: 'center' }}>
                        <span className="stars-text pr-2" style={{ color: '#fff', fontSize: '1rem'}}>Your Rating:</span>
                        <ReactStars
                            count={5}
                            value={this.state.rating}
                            onChange={rating => this.setState({rating})}
                            size={24}
                            color1={'#fff'}
                            color2={'#ffd700'} />
                    </div>
                    <div className="Input Input-Review">
                        <textarea className="Input-text" id="review" type="text"
                                  value={this.state.review}
                                  onChange={(e) => this.setState({review: e.target.value})}
                                  placeholder="Your Review..."
                                  rows="3">
                        </textarea>
                        <label htmlFor="review" className="Input-label">Add Review</label>
                    </div>
                    <div className="empty-action pt-2 text-center pb-2" style={{ marginBottom: '2rem' }}>
                        <button className="btn btn-success btn-lg col-mx-auto" onClick={this.linkSubmitted}>
                            Submit Review for the Product
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddLink;