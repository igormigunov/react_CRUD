import React from 'react';
import {Link} from 'react-router-dom'

export default function UsersList({users, deleteUser}) {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    { users.map((user, index) => (<tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.login}</td>
                        <td>{user.name}</td>
                        <td>
                            <Link to={`/users/form/${user.id}`} className="btn btn-success">Edit</Link>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Remove</button>
                        </td>
                    </tr>)) }

                </tbody>

            </table>
        </div>
    );
}