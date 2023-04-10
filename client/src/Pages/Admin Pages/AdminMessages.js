import React from "react";
import { useGetAllMessagesQuery } from "../../redux/store";

const AdminMessages = () => {
  const { data, error, isFetching } = useGetAllMessagesQuery();

  if (data) {
    console.log(data);
  }
  return <div>Messages</div>;
};

export default AdminMessages;
