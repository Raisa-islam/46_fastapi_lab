from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegistration(BaseModel):
    username: str
    password: str
    email: str
    phone_number: str

@app.post("/register")
async def register_user(user: UserRegistration):
    # Check if username already exists in the file
    with open("users.txt", "r") as file:
        existing_users = file.readlines()
        for existing_user in existing_users:
            if existing_user.split(",")[0] == user.username:
                raise HTTPException(status_code=400, detail="Username already exists")
            if existing_user.split(",")[2] == user.email:
                raise HTTPException(status_code=400, detail="Email already exists")
            if existing_user.split(",")[3] == user.username:
                raise HTTPException(status_code=400, detail="Phone Number already exists")

    # If username doesn't exist, save the user data to the file
    with open("users.txt", "a") as file:
        file.write(f"{user.username},{user.password},{user.email},{user.phone_number}\n")

    return {"message": "User registered successfully"}
