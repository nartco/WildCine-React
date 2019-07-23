import React from 'react';
import Search from '@material-ui/icons/Search';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/SearchBar.css';


const mapStateToProps = (state) => {
    return {
        Search: state.SearchM.SearchM
    }
  }

class searchB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            redirect: false
        };
        // This binding is necessary to make `this` work in the callback
    
      }
    
    handleChange = event => {
    const value = event.target.value;
    this.setState({
        input: value,
     });
    };

    _choice() {
        this.setState({
            redirect: false,
         });
        const action = { type: "CHOICEM", value: escape(this.state.input) } // redux -> recup la valeur recherchee et echape les caracteres speciaux
        this.props.dispatch(action)
    }
   
    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this._choice()
        }
      }


      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/loading'/>
        }
        this.setState({
            redirect: true,
          })
      }
    
    render(){
        return(
                <div className="search-box">
                    {this.props.Search !== ' ' ? this.renderRedirect() : null}
                    <input type="text" name="" className="search-txt" placeholder="Type to search"  onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <p className="search-btn">
                    <Search />
                    </p>                 
                </div>
     
          )
    }
    
}

export default withRouter(connect(mapStateToProps)(searchB));