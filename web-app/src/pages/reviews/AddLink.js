import React from 'react'
import LinkCard from "./LinkCard";

class AddLink extends React.Component {
    state = {
        link: ''
    }

    inputChanged = (e) => {
        this.setState({link: e.target.value})
    }

    linkSubmitted = async () => {
        const {link} = this.state;
        console.log(link)

        await this.props.contract.addProduct(link, link, link, { from: this.props.accounts[0] })
    }

    render() {
        const { web3, accounts, contract } = this.props
        return (
            <div className="">
                <div className="empty">
                    <p className="empty-title h3 text-bold">Add Link</p>
                    {/*<p class="empty-subtitle">Click the button to start a conversation.</p>*/}
                    <div className="form-group has-success col-mx-auto " style={{ width: '80%' }}>
                        <input className="form-input p-2" type="text" value={this.state.link} onChange={(e) => this.inputChanged(e)}  placeholder="Link for the product you want to review..." />
                        {/*<p class="form-input-hint">The name is invalid.</p>*/}
                    </div>
                    <div className="empty-action pt-2">
                        <button className="btn btn-primary" onClick={this.linkSubmitted}>Submit Link for the Product</button>
                    </div>
                    {/*<LinkCard link={this.state.link} />*/}
                </div>

                <div className="container col-mx-auto" style={{ width: '70%' }}>
                    <div className="py-2">
                        <p className="empty-title h3 text-bold">Add Review</p>
                        {/*<p class="empty-subtitle">Click the button to start a conversation.</p>*/}
                        <div class="form-group">
                            <label class="form-label" for="input-example-3">Review</label>
                            <textarea className="form-input p-2" type="text" value={this.state.review} onChange={(e) => this.inputChanged(e)}  placeholder="Link for the product you want to review..." rows="3"></textarea>
                        </div>
                        <div className="empty-action pt-2">
                            <button className="btn btn-primary" onClick={this.linkSubmitted}>Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddLink;