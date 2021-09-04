import React, { useContext, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Spinner, Alert } from 'react-bootstrap'
import UserContext from '../context/Users/UserContext'

const UserListScreen = ({ history }) => {
  const userContext = useContext(UserContext)
  
  // const dispatch = useDispatch()

  // const userList = useSelector((state) => state.userList)
  // const { loading, error, users } = userList

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  // const userDelete = useSelector((state) => state.userDelete)
  // const { success: successDelete } = userDelete

  // useEffect(() => {
  //   if (userInfo && userInfo.isAdmin) {
  //     // dispatch(listUsers())
  //   } else {
  //     history.push('/login')
  //   }
  // }, [dispatch, history, successDelete, userInfo])

  
  useEffect(() => {
    const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
    console.log('userInfo',userInfo);
    if (userInfo && userInfo.isAdmin) {
      // dispatch(listUsers())
      userContext.listAllUsers()
    } else {
      history.push('/login')
    }
  }, [ history, userContext.user, userContext.deleteUserStatus])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      userContext.deleteUser(id)
      // dispatch(deleteUser(id))
    }
  }

  useEffect(()=>{
    if(userContext.deleteUserStatus){
      userContext.refreshDeleteErrorMesssage()
    }
  },[userContext.deleteUserStatus])

  return (
    <>
      <h1>Users</h1>
      {userContext.loading ? (
        <Spinner animation="border" />
      ) : userContext.deleteUserErrorMessage ? (
        <Alert variant='danger'>{userContext.deleteUserErrorMessage}</Alert>
      ) : userContext.userListLoadError ? (
        <Alert variant='danger'>{userContext.userListLoadError}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userContext.userList && userContext.userList.map((user,index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.phoneNumber}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
