import React, {Component} from 'react';
import { createStore } from 'redux';
import initialState from './mockedObject';


function renderElements(filledObject){
  return Object.keys(filledObject).map((key,i)=>{
      return <div className="product" key={i} id={i}>
               <div className="buttons">
                  <span className="delete-btn" onClick = {(e) => {
                    store.dispatch({
                      type:'REMOVE',
                      payload:parseInt(e.target.parentElement.parentElement.id)
                    });
                    e.target.parentElement.parentElement.remove();
                    console.log(store.getState());
                   }}></span>
               </div>
               <div className="image">
                  <img src={filledObject[key].url} alt="" />
               </div>
               <div className="description">
                  <span>{key}</span>
                  <span>Color : {filledObject[key].color}</span>
               </div>
               <div className="quantity">
                  <input type="number" min='1' name="name" defaultValue="1"onChange={(e)=>{
                    e.target.parentElement.nextSibling.innerHTML=e.target.value*filledObject[key].price + ' $';
                  }}></input>
               </div>
               <div className="total-price">{filledObject[key].price} $</div>
             </div>
  })
}


function reducer(state = initialState.goodsPurchased, action){
    if(action.type==='RENDER') {
      return renderElements(state);
      } else if(action.type==='REMOVE'){
          return state.filter((e)=>parseInt(e.key)!==action.payload)
      } else if(action.type==='RENDERREMOVED'){
          return renderElements(state);
      } else {
        return state;
      }
  }
const store = createStore(reducer);

class Cart extends Component {

render(){
  store.dispatch({
    type:'RENDER'
  });

  return(
    <div className='mainCart'>
      {store.getState()}
    </div>
  )
}
}

export default Cart;
