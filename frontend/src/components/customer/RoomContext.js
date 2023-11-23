// RoomContext.js
import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext();

export const useRoomContext = () => useContext(RoomContext);

export function RoomProvider({ children }) {
  const [roomId, setRoomId] = useState(null);

  return (
    <RoomContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
}
