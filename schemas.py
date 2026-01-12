from pydantic import BaseModel, ConfigDict

class RoomBase(BaseModel):
    name: str
    capacity: int
    type: str
    available: bool = True

class RoomCreate(RoomBase):
    pass

class RoomUpdate(RoomBase):
    pass

class RoomOut(RoomBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
