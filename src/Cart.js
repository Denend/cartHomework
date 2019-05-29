import React, {Component} from 'react';
import { createStore } from 'redux';
import initialState from './mockedObject';



function removeProduct( clickedeElem ) {
  store.dispatch ({
    type:'REMOVE',
    payload:parseInt ( clickedeElem.id )
  });
  clickedeElem.remove();
  decreaseCartNumber();
  console.log( store.getState() );
}

function decreaseCartNumber() {
  document.getElementById('cartNum').innerHTML = store.getState().length;
}

function renderElements( filledObject ){
  return Object.keys( filledObject ).map(( key,i ) => {
      return <div className = "product" key = {i} id = {i}>
               <div className = "buttons">
                  <span className = "delete-btn" onClick = { (e) => removeProduct( e.target.parentElement.parentElement )}></span>
               </div>
               <div className = "image">
                  <img src = { filledObject[key].url } alt="" />
               </div>
               <div className = "description">
                  <span> {key} </span>
                  <span> Color : { filledObject[key].color } </span>
               </div>
               <div className = "quantity">
                  <input type = "number" min = '1' name = "name" defaultValue = "1" onChange = { (e) => {
                    e.target.parentElement.nextSibling.innerHTML = e.target.value * filledObject[key].price + ' $';
                  }}></input>
               </div>
               <div className = "total-price"> { filledObject[key].price } $</div>
             </div>
  })
}


function reducer( state = initialState.goodsPurchased, action ){
    if(action.type === 'RENDER') {
      return renderElements( state );
      } else if( action.type === 'REMOVE' ){
          return state.filter( (e) => parseInt( e.key ) !== action.payload)
      } else {
        return state;
      }
  }
const store = createStore( reducer );

class Cart extends Component {

render(){
  store.dispatch({
    type:'RENDER'
  });
  return(
    <div className = 'mainCart'>
      <div className ='iconContainer'>
      <img src ='https://imageog.flaticon.com/icons/png/512/2/2772.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' alt = ''></img>
      <p id = "cartNum"> { store.getState().length } </p>
      </div>
      { store.getState() }
    </div>
  )
}
}

export default Cart;
