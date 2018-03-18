import React from 'react'
import { Link } from 'react-router-dom'
import MicroLinkCard from 'react-microlink'

class Products extends React.Component {
    state = {
        products: [],
        hashedUrls: []
    }

    async componentDidMount() {
        console.log('did mount');
        this.getProducts();
    }

    getProducts = async () => {
        const contract = this.props.contract;
        console.log(contract, this.props);

        const productCount = await contract.getProductCount().then(n => n.toNumber())
        console.log(productCount)
        let productUrls = await contract.getProductUrls();
        let products = []
        for(let i=0;i<productCount; i++) {
            products.push(await contract.products(this.props.web3.utils.toAscii(productUrls[i])))
        }
        console.log(products);
        let hashed = products.map(product => product[0]);
        this.setState({hashedUrls: hashed})

        products = products.map(product => [this.props.web3.utils.toAscii(product[0]).replace(/\0/g,''), product[1]])
        console.log(products);
        this.setState({products})
    }

    render() {
        const {location} = this.props;
        const {products, hashedUrls} = this.state;
        return (
            <div style={{margin: '3rem 0'}}>
                <h3 style={{margin: '2rem 0'}} className="text-center pt-2">Latest Reviewed Products</h3>
                <div className="products-container d-flex">
                    {
                        products.length &&
                            products.map((product, index) =>
                                (
                                    <Product key={index} hashedUrl={product[0]} url={product[1]} />
                                )
                            )
                    }
                </div>
            </div>
        )
    }
}

const Product = ({url, hashedUrl}) =>
    <Link to={`/reviews/${hashedUrl}`}>
        <MicroLinkCard
            url={url}
            style={{margin: '10px auto'}}
        />
    </Link>

export { Products }
