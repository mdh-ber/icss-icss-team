import { useState } from "react";

type Room = {
  id: number;
  name: string;
  capacity: number;
  type: string;
  status: boolean;
  equipment?: string | null;
  location?: string | null;
};

export default function RoomsPage() {
  const [rooms] = useState<Room[]>([
    {
      id: 1,
      name: "A101",
      capacity: 40,
      type: "Lecture",
      status: true,
      equipment: "Projector",
      location: "Building A, Floor 1",
    },
    {
      id: 2,
      name: "B202",
      capacity: 25,
      type: "Lab",
      status: false,
      equipment: null,
      location: "Building B, Floor 2",
    },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Rooms</h1>

      <table border={1} cellPadding={10} style={{ marginTop: 12, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Equipment</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.capacity}</td>
              <td>{room.status ? "Active" : "Inactive"}</td>
              <td>{room.equipment ?? "-"}</td>
              <td>{room.location ?? "-"}</td>
              <td>
                <button onClick={() => alert("Edit " + room.id)}>Edit</button>{" "}
                <button onClick={() => alert("Delete " + room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
