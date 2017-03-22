import React, { Component } from 'react';
import {connect} from 'react-redux';
import UsersList from './list';
import {fetchUsers, deleteUser} from '../../../actions';

class Users extends Component {
    componentDidMount(){
        this.props.fetchUsers();
    }
    deleteUser(userID){
        var isDelete = confirm("Are you sure you want to delete user?");
        if(isDelete){
            this.props.deleteUser(userID)
        }
    }
    render() {
        return (
            <div>
                <UsersList users={this.props.users} deleteUser={(userID) => this.deleteUser.call(this,userID)}></UsersList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps,{fetchUsers, deleteUser})(Users);
