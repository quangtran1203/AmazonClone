export const initialState = {
    basket: [],
    user: null,
};

//Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state, //return whatever the state was
                basket: [...state.basket, action.item], //along with whatever was inside the basket plus new items
            };
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);  //remove the item at this index
            }
            else {
                console.warn(`Can't remove item (id: ${action.id}) as it is not in the basket!`);
            }
            return { ...state, basket: newBasket, };
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: [],
            };
        default:
            return state;  //else, just return the current state
    }
};

export default reducer;