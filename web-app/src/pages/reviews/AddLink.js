import React from 'react'
import MicroLinkCard from 'react-microlink'
import './AddLink.css'

class AddLink extends React.Component {
    state = {
        link: '',
        review: '',
        loadLinkPreview: false
    }

    inputChanged = (e) => {
        this.setState({link: e.target.value}, () => {
            this.setState({loadLinkPreview: this.validURL(this.state.link)})
        })
    }

    linkSubmitted = async () => {
        const {link, review} = this.state;
        if (link === "" || review === "")   {
            console.log('')
            return;
        }
        console.log(link)

        await this.props.contract.addProduct(link, link, {from: this.props.accounts[0]})
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
        const {web3, accounts, contract} = this.props;
        const {link, loadLinkPreview} = this.state;
        return (
            <div style={{backgroundColor: '#7E57C2'}}>
                <div className="Wrapper col-mx-auto">
                    <h1 className="Title">Review Deck</h1>
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
                {/*/!*<LinkCard link={this.state.link} />*!/*/}
            </div>
        )
    }
}

export default AddLink;