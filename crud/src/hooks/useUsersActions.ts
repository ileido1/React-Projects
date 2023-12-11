import { UserId, deleteUserById, addNewUser,rollback, User,UserState, updateUserById,setEditingUser } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
    const dispatch = useAppDispatch();

    const removeUser = (id: UserId) => {
      dispatch(deleteUserById(id));
    }
    const addUser = ({ name, email, github }: User) => {
      dispatch(addNewUser({ name, email, github }));
    }
    const rollbackuser = (user: UserState) => {
      dispatch(rollback(user));
    }
    const updateUser = (user: UserState) => {
    dispatch(updateUserById(user))
    }
    const EditingUser = (id: UserId) => {
      dispatch(setEditingUser(id));
    }
     return {removeUser, addUser, rollbackuser, updateUser,EditingUser}
}