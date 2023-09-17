import React from "react";
import "./../styles/style.scss";
import UserList from "./../components/admin/usersList/UserList";

const AdminPage = () => {
  return (
    <>
      <div className="container">
        <UserList />
      </div>
    </>
  );
};

export default AdminPage;
