import React from 'react'
import { Redirect } from 'react-router-dom'

// page pour rediriger directement sur la page de recherche meme depuis elle meme

class loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: true};    
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/search'/>
        }
      }
    
    render(){
      return(
            <div>
                {this.renderRedirect()}
            </div>
      )
    }
  }
  
  export default loading;