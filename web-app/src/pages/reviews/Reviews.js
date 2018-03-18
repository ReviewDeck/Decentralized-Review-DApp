import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { AppNavigation } from '../../components/navigation'
import AddLink from './AddLink';
import StyledReviews from "./StyledReviews/StyledReviews";
// import sendToZulip from './zulip'

class Reviews extends React.Component {
    state = { reviews: [] }

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
        contract.products(this.props.match.url).then(product=>{
            product_url = product[1]
            console.log(product)
        })

        // sendToZulip(product_url, 'skjgdsg', this.props.accounts[0])

        const reviewCount = await contract.getReviewCount(hashedUrl).then(n => n.toNumber())
        console.log(reviewCount)

    //all reviews for a product

        let reviews = []

        for(let i=0;i<reviewCount;i++){
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
        const { balance } = this.state;
        // let data= [{
        //     "content": "Hack In the North Is Best",
        //     "time": 29,
        //     "date": "03/17/2018",
        //     "author":"sanket"
        // },
        //     {
        //         "content": "Eat Code Sleep Repeat!!!!",
        //         "time": 29,
        //         "date": "03/17/2018",
        //         "author":"abhijeet"
        //     }
        // ];
        return (
            <Wrapper>
                <AppNavigation/>
              <div className="bg-gray py-2" style={{paddingTop: 70}}>
                <h1 className="text-center text-bold p-0">Review Deck</h1>
              </div>
              {/*<AddLink {...this.props} />*/}
              <StyledReviews data={this.state.reviews} />
            </Wrapper>
        )
    }
}

export { Reviews }
