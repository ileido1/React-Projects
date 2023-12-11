import{ SortBy, type User} from '../types.d'
import React from 'react';
interface UsersListProps {
    users: User[];
    color: boolean;
    handleDelete: (id:string) => void;
    changeSorting: (sort: SortBy) => void;
}


const UsersList: React.FC<UsersListProps> = ({ users, color, handleDelete ,changeSorting}) => {
    return (
        <table style={{width:'100%'}} >
            <thead>
                <tr>
                    <th>Picture</th>
                    <th onClick={()=>changeSorting(SortBy.NAME)} >Name</th>
                    <th onClick={()=>changeSorting(SortBy.LAST)}>Last name</th>
                    <th onClick={()=>changeSorting(SortBy.COUNTRY)}>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                users.map((user,index) => {
                const style = index % 2 === 0 ? 'red' : 'blue'
                const colorth = color ? style : 'transparent'
                  return (<tr key={user.email} style={{backgroundColor: colorth}}>
                        <td>
                            <img src={user.picture.thumbnail} alt={user.name.first} />
                        </td>
                        <td>
                            {user.name.first}
                        </td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button type="button" onClick={()=>handleDelete(user.login.uuid)}>Delete</button>
                        </td>
                    </tr>
                
                 ) })}
            </tbody>
        </table>
    );
};

export default UsersList;
