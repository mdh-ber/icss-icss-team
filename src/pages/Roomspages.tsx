import { useState } from "react";

type Room = {
  room_number: string;
  room_type: string;
  room_capacity: number;
  is_available: boolean;
};

export default function RoomsPage() {
  const [rooms] = useState<Room[]>([
    { room_number: "A101", room_type: "Lecture", room_capacity: 40, is_available: true },
    { room_number: "B202", room_type: "Lab", room_capacity: 25, is_available: false },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Rooms</h1>

      <table border={1} cellPadding={10} style={{ marginTop: 12, width: "100%" }}>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_number}>
              <td>{room.room_number}</td>
              <td>{room.room_type}</td>
              <td>{room.room_capacity}</td>
              <td>{room.is_available ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => alert("Edit " + room.room_number)}>Edit</button>{" "}
                <button onClick={() => alert("Delete " + room.room_number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
