import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { AppNavigation } from '../../components/navigation'
import AddLink from './AddLink';
import StyledReviews from "./StyledReviews/StyledReviews";
import MicroLinkCard from 'react-microlink'

// import sendToZulip from './zulip'

class Reviews extends React.Component {
    state = {
        reviews: [],
        url: ''
    }

    async componentDidMount () {
        console.log(this.props.contract, this.props.location, this.props.match)

        await this.getReviews()
    }

    // storeValue = async () => {
    //   const { accounts, contract } = this.props
    //   await this.getValue()
    //   await contract.set(this.state.balance + 5, { from: accounts[0] })
    //   await this.getValue()
    // }

    getReviews = async () => {
        const {contract , web3}= this.props;
        const hashedUrl = this.props.match.params.product;
        console.log(contract, this.props);

        let product_url;
        contract.products(this.props.match.params.product).then(product=>{
            product_url = product[1]
            console.log(product, 'product url', product_url)
            this.setState({url: product_url})
        })

        // sendToZulip(product_url, 'skjgdsg', this.props.accounts[0])

        const reviewCount = await contract.getReviewCount(hashedUrl).then(n => n.toNumber())
        console.log(reviewCount)

    //all reviews for a product

        let reviews = []

        for(let i=reviewCount-1;i>0;i--){
            console.log(hashedUrl)
            const asciiUrl= this.props.web3.utils.fromAscii(hashedUrl);
            console.log(asciiUrl)
            //attribute 1 of struct
            await contract.reviews(asciiUrl,i).then(r=>{
                console.log('att1'+r[0].toNumber()) //it is integers and so on....
                let review = {
                    address: r[2],
                    timestamp: r[3].toNumber(),
                    rating: r[4].toNumber(),
                    content: r[5]
                }
                reviews.push(review)
                console.log('review', review) //it is integers and so on....
            })
        }

        this.setState({reviews})
    }

    render () {
        const { web3, accounts, contract } = this.props
        return (
            <Wrapper>
                <AppNavigation/>
              {/*<div className="bg-gray py-2" style={{paddingTop: 70}}>*/}
                {/*<h1 className="text-center text-bold p-0">Review Deck</h1>*/}
              {/*</div>*/}
                {
                    this.state.url !== "" ?
                        <ProductInfo url={this.state.url} />
                        : null
                }
              {/*<AddLink {...this.props} />*/}
              <StyledReviews  {...this.props} url={this.state.url} data={this.state.reviews} />
            </Wrapper>
        )
    }
}

const ProductInfo = ({url}) => (
    <MicroLinkCard
        url={url}
        style={{margin: '10px auto'}}
    />
)

export { Reviews }
