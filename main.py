from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

import models
import schemas
from database import SessionLocal, engine

# create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Room Management Backend")

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Room backend running successfully"}

# CREATE
@app.post("/rooms", response_model=schemas.RoomOut)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    db_room = models.Room(**room.model_dump())
    db.add(db_room)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Room name already exists")
    db.refresh(db_room)
    return db_room

# READ ALL
@app.get("/rooms", response_model=list[schemas.RoomOut])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(models.Room).order_by(models.Room.id).all()

# READ ONE
@app.get("/rooms/{room_id}", response_model=schemas.RoomOut)
def get_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

# UPDATE
@app.put("/rooms/{room_id}", response_model=schemas.RoomOut)
def update_room(room_id: int, updated: schemas.RoomUpdate, db: Session = Depends(get_db)):
    room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    data = updated.model_dump()
    for key, value in data.items():
        setattr(room, key, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Room name already exists")

    db.refresh(room)
    return room

# DELETE
@app.delete("/rooms/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    db.delete(room)
    db.commit()
    return {"message": "Room deleted successfully"}
