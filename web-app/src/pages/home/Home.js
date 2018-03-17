import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import {Products} from "./Products";
import AddLink from "../reviews/AddLink";
import AddReview from "../reviews/AddReview";

class Home extends React.Component {
    render() {
        const {location} = this.props;
        return (
          <Wrapper>
            {/*<h1>Home</h1>*/}
            {/*<p>Note that Web3 is already loaded.</p>*/}
              <AddLink {...this.props} />
              <Products {...this.props}/>
              <AddReview {...this.props} />
            <AppNavigation location={location} />
          </Wrapper>
        )
    }
}

export { Home }
