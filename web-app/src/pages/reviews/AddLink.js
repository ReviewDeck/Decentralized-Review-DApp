import React from 'react'

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
            <div>
                <input type="text" value={this.state.link} onChange={(e) => this.inputChanged(e)} />
                <button onClick={this.linkSubmitted}>Submit Link</button>
            </div>
        )
    }
}

export default AddLink;