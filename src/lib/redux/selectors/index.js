const calculatorTotal = ($0, $1) => $0 + $1;
const selectItems = (state) => state.cart.items;

export const selectCartTotal = (state) => {
    return selectItems(state)
    .map(item => item.price * item.quantity)
    .reduce(calculatorTotal, 0)
}