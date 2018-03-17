import React from 'react'
import MicroLinkCard from 'react-microlink'

class AddLink extends React.Component {
    state = {
        link: '',
        loadLinkPreview: false
    }

    inputChanged = (e) => {
        this.setState({link: e.target.value}, () => {
            this.setState({loadLinkPreview: this.validURL(this.state.link)})
        })
    }

    linkSubmitted = async () => {
        const {link} = this.state;
        console.log(link)

        await this.props.contract.addProduct(link, link, { from: this.props.accounts[0] })
    }

    validURL = (str) => {
        let pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!pattern.test(str)) {
            console.log("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { web3, accounts, contract } = this.props;
        const {link, loadLinkPreview} = this.state;
        return (
            <div className="">
                <div className="empty">
                    <p className="empty-title h3 text-bold">Add Link</p>
                    <div className="form-group has-success col-mx-auto " style={{ width: '80%' }}>
                        <input className="form-input p-2" type="text" value={this.state.link} onChange={(e) => this.inputChanged(e)}  placeholder="Link for the product you want to review..." />
                        {/*<p class="form-input-hint">The name is invalid.</p>*/}
                    </div>
                    {
                        loadLinkPreview && link !== ""
                        ?
                            <MicroLinkCard
                                url={this.state.link}
                                target="_blank"
                            />
                            : null

                    }
                    <div className="empty-action pt-2">
                        <button className="btn btn-primary" onClick={this.linkSubmitted}>Submit Link for the Product</button>
                    </div>
                    {/*<LinkCard link={this.state.link} />*/}
                </div>
            </div>
        )
    }
}

export default AddLink;