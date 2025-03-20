export function setUser(state, user) {
    state.user.data = user;
}

export function setToken(state, token) {
    state.user.token = token;
    if (token) {
        sessionStorage.setItem('TOKEN', token);
    } else {
        sessionStorage.removeItem('TOKEN')
    }
}

export function setSuccessMessage (state, message) {
    state.successMessage = message
}

export function setProducts(state, [loading, data = null]) {

    if (data) {
        state.products = {
            ...state.products,
            data: data.data,
            links: data.meta?.links,
            page: data.meta.current_page,
            limit: data.meta.per_page,
            from: data.meta.from,
            to: data.meta.to,
            total: data.meta.total,
        }
    }
    state.products.loading = loading;
}


export function setProductToCart(state,product){

    const existingProduct = state.cart.find(item=>item.id == product.id)
    if (existingProduct) {
        existingProduct.quantity += 1
        existingProduct.totalPrice = existingProduct.quantity * product.price
    }
    else
        state.cart.push({id:product.id,quantity:1,price : product.price,name:product.title,totalPrice: product.price * 1})

    localStorage.setItem("cart",JSON.stringify(state.cart))
}

export function removeProductFromCart(state,itemId){
    state.cart = state.cart.filter(item=>item.id != itemId)

    localStorage.setItem('cart',JSON.stringify(state.cart))
}

export function  updateQuantityFromCart(state,{itemId,action}){
    const cartItem = state.cart.find(item=>item.id == itemId)

    if(action == "increment")
        cartItem.quantity++

    if(action == "decrement" && cartItem.quantity > 1 )
        cartItem.quantity--

    localStorage.setItem('cart', JSON.stringify(state.cart));

}

export function removeAllCartData(state){
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart));
}
