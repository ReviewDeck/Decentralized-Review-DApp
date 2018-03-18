import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { AppNavigation } from '../../components/navigation'
import AddLink from './AddLink';

class Reviews extends React.Component {
    state = { balance: null }

    async componentDidMount () {
        console.log(this.props.contact)
        // await this.getValue()
    }

    // storeValue = async () => {
    //   const { accounts, contract } = this.props
    //   await this.getValue()
    //   await contract.set(this.state.balance + 5, { from: accounts[0] })
    //   await this.getValue()
    // }

    // getValue = async () => {
    //   const { accounts, contract } = this.props
    //   const response = await contract.get.call({ from: accounts[0] })
    //   this.setState({ balance: response.toNumber() })
    // }

    render () {
        const { web3, accounts, contract } = this.props
        const { balance } = this.state
        return (
            <Wrapper>
              <div className="bg-gray py-2" style={{paddingTop: 70}}>
                <h1 className="text-center text-bold p-0">Review Deck</h1>
              </div>
              <AddLink {...this.props} />
              <AppNavigation location={this.props.location} />
            </Wrapper>
        )
    }
}

export { Reviews }
