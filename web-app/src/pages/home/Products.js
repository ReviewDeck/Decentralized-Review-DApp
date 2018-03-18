import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { AppNavigation } from '../../components/navigation'

class Products extends React.Component {
    state = {
        products: []
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
        products = products.map(product => [this.props.web3.utils.toAscii(product[0]).replace(/\0/g,''), product[1]])
        console.log(products);
        this.setState({products})
    }

    render() {
        const {location} = this.props;
        const {products} = this.state;
        return (
            <div>
                <p>Latest Reviewed Products</p>
                {
                    products.length &&
                        products.map((product, index) =>
                            (
                                <div key={index}>
                                    <p>{product[0]}</p>
                                    <p>{product[1]}</p>
                                </div>
                            )
                        )
                }
            </div>
        )
    }
}

export { Products }
