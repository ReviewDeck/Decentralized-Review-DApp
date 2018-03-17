import React from 'react'
import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <ContentLoader
        height={200}
        width={600}
        speed={2}
        primaryColor={"#f3f3f3"}
        secondaryColor={"#ecebeb"}
    >
        <circle cx="37" cy="22" r="8" />
        <rect x="55.65" y="16.53" rx="5" ry="5" width="486.948" height="9.8" />
        <circle cx="37" cy="52" r="8" />
        <rect x="55.65" y="46.53" rx="5" ry="5" width="486.948" height="9.8" />
        <circle cx="37" cy="82" r="8" />
        <rect x="55.65" y="76.53" rx="5" ry="5" width="486.948" height="9.8" />
        <circle cx="37" cy="112" r="8" />
        <rect x="55.65" y="106.53" rx="5" ry="5" width="486.948" height="9.8" />
    </ContentLoader>
)

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
                            <MyLoader className="col-mx-auto" />
                            :
                                <span className="d-flex ">
                                    <div className="card-image">
                                        <img id="icon" src={this.state.image} className="img-responsive" style={{width: '90px'}}/>
                                    </div>
                                    <div>
                                        <div className="card-header">
                                            <div className="card-title h5 text-ellipsis">{this.state.title}</div>
                                            {/*<div className="card-subtitle text-gray">Software and hardware</div>*/}
                                        </div>
                                        <div className="card-body text-ellipsis">{this.state.description}</div>
                                    </div>
                                </span>
                    }
                </div>
            </div>
        )
    }
}

export default LinkCard;