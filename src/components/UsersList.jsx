import { useState, useEffect } from "react";
import { deleteUser, getAllUsers, createUser } from "../services/userService";

import UserListItem from "./UserListItem";
import DeleteModal from "./DeleteModal";
import Create from "./Create";
import UserDetail from "./UserDetail";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userForDeleteId, setUserForDeleteId] = useState("");

  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userDetailId, setUserDetailId] = useState("");


  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(Object.values(data));
    });
  }, []);

  const onCreateClickHandler = () => setShowCreate(true);

  const onCloseClickHandler = () => setShowCreate(false);

  const showUserDetailClickHandler = (userId) => {
    setShowUserDetail(true);
    setUserDetailId(userId);

  }

  const onCloseUserInfoClickHandler = () => {
    setShowUserDetail(false);
    setUserDetailId('');
  }

  const showDeleteModalClickHandler = async (userId) => {
    setShowDeleteModal(true);
    setUserForDeleteId(userId);
  };

  const hideDeleteModalClickHandler = () => {
    setShowDeleteModal(false);
    setUserForDeleteId("");
  };

  const deleteUserClickHandler = async () => {
    await deleteUser(userForDeleteId);
    setUsers((users) => users.filter((u) => u._id !== userForDeleteId));

    setShowDeleteModal(false);
    setUserForDeleteId("");
  };

  const createUserClickHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    const createdUser = await createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      imageUrl: data.imageUrl,
      phoneNumber: data.phoneNumber,
      createdAt: new Date().getDate(),
      updatedAt: "",
      address: {
        country: data.country,
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
      },
    });

    setUsers(users => [...users, createdUser]);
    setShowCreate(false);
  };
  return (
    <>
    {showUserDetail && <UserDetail userId={userDetailId} onClose={onCloseUserInfoClickHandler}/>}
      {showCreate && (
        <Create
          onClose={onCloseClickHandler}
          onCreate={createUserClickHandler}
        />
      )}
      <div className="table-wrapper">
        {showDeleteModal && (
          <DeleteModal
            onDelete={deleteUserClickHandler}
            onCancel={hideDeleteModalClickHandler}
          />
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                First name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Last name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Email
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className=" icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Phone
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Created
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserListItem
                key={user._id}
                {...user}
                onDeleteClickHandler={showDeleteModalClickHandler}
                onInfoBtnClickHandler={showUserDetailClickHandler}
              />
            ))}
          </tbody>
        </table>
        <button onClick={onCreateClickHandler} className="btn-add btn">
          Add new user
        </button>
      </div>
    </>
  );
};

export default UsersList;
