import React from 'react'
import MicroLinkCard from 'react-microlink'

class LinkCard extends React.Component {
    state = {
        title: '',
        image: '',
        description: '',
        loading: false
    }

    componentWillReceiveProps(nextProps) {
        console.log('will receive props', nextProps)
        if(nextProps.link !== '') {
            this.setState({loading: true})
            let url = nextProps.link;
            let urlEncoded = encodeURIComponent(url);
            console.log({urlEncoded});
            let apiKey = '5aacb099c8869a6a06cf147a';

            // The entire request is just a simple get request with optional query parameters
            let requestUrl = "https://opengraph.io/api/1.1/site/" + urlEncoded + '?app_id=' + apiKey;

            fetch(requestUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        title: data.hybridGraph.title,
                        description: data.hybridGraph.description,
                        image: data.hybridGraph.image
                    })

                    setTimeout(this.setState({loading: false}), 500)
                })
        }
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
            <div className="card">
                <span>
                    <button className="btn btn-sm" id="loadOpenGraphData">Load OpenGraph Data</button>
                </span>
                <hr/>
                <div className="card col-mx-auto" style={{width: '600px', height: '200px', overflow: 'hidden'}}>
                    {
                        !!this.state.title && this.state.loading ?
                            null
                            :
                            <MicroLinkCard
                                url={this.state.url}
                                target="_blank"
                            />
                    }
                </div>
            </div>
        )
    }
}

export default LinkCard;