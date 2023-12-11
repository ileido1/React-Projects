import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type UserId = string

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserState  extends User {
    id: UserId;
}

const DEFAULT_STATE =[{
    name: "John Doe",
    email: "j@a.com",
    id: '1',
    github: "jhonsin"
  },
    {
        name: "Jane Doe",
        email: "jane@gmail.com",    
        id:'2',
        github: "janedoe"
    }
]

const initialState: UserState[] = (()=>{
    const persistedState = localStorage.getItem('reduxState');
    if(persistedState){
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();

const initialStateoptions = {
    editingUserId: '',
  };
  
export const userOptionsSlice = createSlice({
    name: 'useroptions',
    initialState: initialStateoptions,
    reducers: {
        setEditingUser: (state, action: PayloadAction<UserId>) => {
            state.editingUserId = action.payload;
          },
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            return state.filter((user) => user.id !== action.payload);
        },
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            state.push({...action.payload, id})
        },
        rollback: (state, action: PayloadAction<UserState>) => {
            const isUserAlready = state.some((user) => user.id === action.payload.id);
            if(!isUserAlready){
                state.push(action.payload);
            }
        },
        updateUserById: (state, action: PayloadAction<UserState>) => {
            const userIndex = state.findIndex((user) => user.id === action.payload.id);
            if(userIndex !== -1){
                state[userIndex] = action.payload;
            }
        },
    }
});
export default userSlice.reducer;
export const userOptionsReducer = userOptionsSlice.reducer;
export const { deleteUserById, addNewUser,rollback,updateUserById } = userSlice.actions;
export const {setEditingUser} = userOptionsSlice.actions;