export const initialState = JSON.parse(localStorage.getItem('cart')) || []
export const updateLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}
export const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productIncartIndex = state.findIndex((product) => product.id === id)

            if (productIncartIndex >= 0) {
                const newCart = structuredClone(state)
                newCart[productIncartIndex].quantity += 1
                updateLocalStorage(newCart)
                return newCart
            } else {
               
               const newState = [...state, {
                    ...actionPayload,
                    quantity: 1
                }
                ]
                updateLocalStorage(newState)
                return newState
            }
        }
        case 'removeFromCart': {
            const { id } = actionPayload
            const newState = state.filter((product) => product.id !== id)
            updateLocalStorage(newState)
            return newState
        }
        case 'clearCart': {
            updateLocalStorage([])
            return []
        }

    }
}