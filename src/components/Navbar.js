import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Theaters from '@material-ui/icons/Theaters';
import Clear from '@material-ui/icons/Clear';
import Dehaze from '@material-ui/icons/Dehaze';
import SearchBar from './searchBar';


import '../css/nav.css';

class NavBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      click: false
    };
  }

  handleClick() {
    if(this.state.click === false){
      this.setState({click: true},
        () => {this.ulActive()})
      }
      else{
        this.setState({click: false},
          () => {this.ulActive()})
        }
      }

  ulActive(){ // couleur sur le chemin actuel
    if(this.state.click === true){
      return('navUl active') // classname
    }

    else if(this.state.click === false){
      return('navUl')
    }
  }
  toggle(){
    if(this.state.click){
      return(<Clear style={{fontSize: 30, color: '#26C485', position: 'relative', bottom: '1.5rem', transition: '1s' }} />)
    }
    else{
      return(<Dehaze style={{fontSize: 30, color: '#26C485', position: 'relative', bottom: '1.5rem', transition: '1s' }} />)
    }
  }

  render(){
    let location = window.location.pathname
    return(
      <header> 
          <div className="logo">
            <Theaters style={{position: 'relative', top: '1.7rem', fontSize: 30, color: '#26C485'}} /> {/* logo */} 
            <div className="navLogo"><NavLink to="/"><h1>WildCiné</h1></NavLink></div>
          </div>
          <div className="SearchBar">
            <SearchBar />
          </div> 
          <span onClick={() => this.handleClick()} className="toggle">{this.toggle()}</span>
          <ul className={this.ulActive()}>
            <li className={location === '/' ? 'navLinkActive' : 'navLink'}><NavLink to="/">Home</NavLink></li>
            <li className='navLinkAct' ><NavLink to="/discover">Discover</NavLink></li>
            <li className='navLinkAct' ><NavLink to="/upcoming">Upcoming</NavLink></li>
            <li className='navLinkAct'><NavLink to="/favorite">favorite</NavLink></li>
          </ul>
      </header>
    )
  }
}

export default withRouter(NavBar)
