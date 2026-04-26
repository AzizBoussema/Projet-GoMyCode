import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
  const currentState = store.getState();
  if (currentState && currentState.cartReducer) {
    try {
      const serializedState = JSON.stringify(currentState.cartReducer.items);
      localStorage.setItem("cartItems", serializedState);
    } catch (err) {
      console.error("Could not save cart to localStorage", err);
    }
  }
});

export default store;
