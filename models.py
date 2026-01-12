from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    type = Column(String, nullable=False)  # e.g. Lecture, Lab, Seminar
    available = Column(Boolean, default=True, nullable=False)
