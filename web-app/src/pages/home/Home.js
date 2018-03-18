import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { AppNavigation } from '../../components/navigation'
import {Products} from "./Products";
import AddLink from "../reviews/AddLink";

class Home extends React.Component {
    render() {
        const {location} = this.props;
        return (
          <Wrapper>
              <AddLink {...this.props} />
              <Products {...this.props}/>
          </Wrapper>
        )
    }
}

export { Home }
