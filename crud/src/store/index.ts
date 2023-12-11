import { Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, {rollback} from './users/slice';
import { toast } from "sonner";
import { userOptionsReducer } from "./users/slice";
const persistenceMidelware : Middleware = (store) => (next) => (action) => {
   next(action)
   localStorage.setItem('reduxState', JSON.stringify(store.getState()))

}
const syncWithDatabase :Middleware = (store) => (next) => (action) => {
   const {type, payload} = action;
   const previousState = store.getState()
   console.log(previousState)
    next(action)
    if(type === 'user/deleteUserById'){
      const userToRemove = previousState.users.find((user) => user.id === payload)

        fetch(`https://jsonplaceholder.typicode.com/posts/${payload}`, {
            method: 'DELETE',
          }).then(response =>{
            if (response.ok){
                toast.success('Usuario has been deleted')
            }
          }).catch(err => {
            toast.error('Error deleting user')
            if (userToRemove) store.dispatch(rollback(userToRemove))
            console.log(err)
          })
    }
}
export const store = configureStore({
    reducer:{
        users: usersReducer,
        options: userOptionsReducer
    },
    middleware: [persistenceMidelware, syncWithDatabase]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
