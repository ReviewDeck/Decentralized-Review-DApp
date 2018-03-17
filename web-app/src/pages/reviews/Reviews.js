import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import AddLink from './AddLink';
import AddReview from "./AddReview";

// Demonstration of a basic dapp with the withWeb3 higher-order component
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
        // Uncomment to use web3, accounts or the contract:
        const { web3, accounts, contract } = this.props
        const { balance } = this.state
        return (
            <Wrapper>
              <div className="bg-gray py-2" style={{paddingTop: 70}}>
                <h1 className="text-center text-bold p-0">Review Deck</h1>
                  {/*<div>*/}
                  {/*<P>Current Balance: {balance}</P>*/}
                  {/*<Button leftMargin onClick={this.getValue}>Refresh...</Button>*/}
                  {/*</div>*/}
              </div>
              <AddLink {...this.props} />
                <AddReview {...this.props} />
                {/*<Button onClick={this.storeValue}>Add 5 to the account balance</Button>*/}
              <AppNavigation location={this.props.location} />
            </Wrapper>
        )
    }
}

const P = ({ children }) =>
    <p style={{ display: 'inline-block', marginBottom: '20px' }}>{ children }</p>

const Button = ({ children, leftMargin, ...rest }) => (
    leftMargin
        ? <button style={{ marginLeft: '20px' }} {...rest}>{ children }</button>
        : <button {...rest}>{ children }</button>
)

export { Reviews }
