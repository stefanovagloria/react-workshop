import { useState, useEffect } from "react";
import {
  deleteUser,
  getAllUsers,
  createUser,
  getUserById,
} from "../services/userService";

import UserListItem from "./UserListItem";
import DeleteModal from "./DeleteModal";
import Create from "./Create";
import UserDetail from "./UserDetail";
import Edit from "./Edit";
import Spinner from "./Spinner";
import Error from "./Error";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userForDeleteId, setUserForDeleteId] = useState("");

  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userDetail, setUserDetail] = useState("");

  const [userEditId, setUserEditId] = useState("");

  const [showSpinner, setShowSpinner] = useState(true);
  const [failedRequest, setFailedRequest] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(Object.values(data));
      })
      .catch((error) => {
        setFailedRequest(true);
      });

    setShowSpinner(false);
  }, []);

  const onCreateClickHandler = () => setShowCreate(true);

  const onCloseClickHandler = () => setShowCreate(false);

  const showUserDetailClickHandler = async (userId) => {
    const user = await getUserById(userId);
    setUserDetail(user);
    setShowUserDetail(true);
  };

  const onCloseUserInfoClickHandler = () => {
    setShowUserDetail(false);
    setUserDetail("");
  };

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

    setUsers((users) => [...users, createdUser]);
    setShowCreate(false);
  };

  const showEditClickHandler = async (userId) => {
    setUserEditId(userId);
  };

  const onCloseUserEditClickHandler = () => setUserEditId("");

  const onEditHandler = (userId, editedUser) => {
    setUsers((users) => {
      const updatedUsers = users.filter((user) => user._id !== userId);
      return [...updatedUsers, editedUser];
    });

    setUserEditId("");
  };

  const onSortClickHandler = (e) => {
    let sortCriteria;

    e.target.textContent === ""
      ? (sortCriteria = e.target.parentElement.textContent)
      : (sortCriteria = e.target.textContent);
   

      console.log(sortCriteria)
  };

  return (
    <>
      {showSpinner && <Spinner />}
      {userEditId && (
        <Edit
          userId={userEditId}
          onClose={onCloseUserEditClickHandler}
          onEdit={onEditHandler}
        />
      )}
      {showUserDetail && (
        <UserDetail user={userDetail} onClose={onCloseUserInfoClickHandler} />
      )}
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

        {failedRequest && <Error errorMessage={"Failed to fetch"} />}
        {users.length === 0 && !failedRequest && (
          <Error errorMessage={"There is no users yet."} />
        )}
        {users.length > 0 && (
          <table className="table">
            <thead onClick={onSortClickHandler}>
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
                  onEditClickHandler={showEditClickHandler}
                />
              ))}
            </tbody>
          </table>
        )}

        <button onClick={onCreateClickHandler} className="btn-add btn">
          Add new user
        </button>
      </div>
    </>
  );
};

export default UsersList;
