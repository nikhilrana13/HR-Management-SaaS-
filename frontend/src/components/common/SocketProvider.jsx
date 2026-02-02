"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addNotification } from "@/redux/NotificationSlice";
import { getSocket } from "@/config/socket";

const SocketProvider = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const joinedRef = useRef(false)

  useEffect(() => {
   if (!user?.id || !user?.companyId) {
    //   console.log("user not ready", user);
      return;
    }
    const socket = getSocket();
    // console.log("socket instance", socket.id, socket.connected);

    const joinRooms = () => {
      if (joinedRef.current) return; // prevent duplicate join
      joinedRef.current = true;
    //   console.log("joining rooms...");
      socket.emit("join-company", {
        companyId: user.companyId,
        userId: user.id,
      });
      socket.emit("join-user", {
        userId: user.id,
      });
    } 
    if (socket.connected) {
      joinRooms(); // already connected
    } else {
      socket.on("connect", joinRooms); // wait for connection
    }

    socket.on("notification", (data) => {
      console.log("notification received", data);
      toast.success(data.title);
      dispatch(addNotification(data));
    });

    return () => {
      socket.off("connect", joinRooms);
      socket.off("notification");
      joinedRef.current = false
    };
  }, [user?.id, user?.companyId]);
  return null;
};

export default SocketProvider;
