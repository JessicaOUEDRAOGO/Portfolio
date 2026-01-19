# Classroom Collaborative (VR)

## Overview
Classroom Collaborative is a multi-user VR classroom designed to enable natural and immersive collaboration between multiple participants in a shared virtual environment.

The project focuses on real-time interaction, role management, and synchronization to support collaborative learning scenarios.

![Classroom Collaborative Demo](unity/classRoomCollaborative/classRoom.gif)


---

## Objectives
The main objectives of this project are:
- Allow multiple users to join the same virtual classroom
- Enable shared object manipulation between users
- Integrate a collaborative virtual whiteboard
- Manage different user roles (teacher / student)
- Ensure smooth and stable network synchronization
- Provide an intuitive and learning-oriented user experience

---

## Technologies
- **Unity**
- **C#**
- **Unity Netcode for GameObjects (NGO)** – networking and synchronization
- **Unity XR Interaction Toolkit** – VR interactions
- **Vivox** – spatialized voice communication

---

## System Architecture
The application is based on a host-server architecture.  
A central host server manages the session, while VR headsets automatically connect to the shared virtual environment.

The global architecture is organized around four main functional modules:
- Networking and session management
- VR interaction and object manipulation
- Collaborative tools (whiteboard, shared objects)
- User roles and permissions

---

## Project Context
This project explores the use of collaborative VR environments as tools for learning and interaction, combining real-time 3D, networking, and immersive user experience design.

Presentation Video
The video is stored via Git LFS. To download it, visit the repository and click on: "unity/classRoomCollaborative/video.mp4" → Download ( https://github.com/Jessica123-cell/portfolio-3d-unity-unreal/blob/main/unity/classRoomCollaborative/Video.mp4 ).

