# -*- coding: utf-8 -*-

from ultralytics import YOLO
import cv2

# Charger le modele YOLO entraine
model = YOLO("C:/Users/ouedraogo/Downloads/Modeleyolodetection/best.pt")

# Ouvrir la webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Erreur: webcam non detectee")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Prediction
    results = model(frame, conf=0.25)

    # Dessiner les detections
    annotated_frame = results[0].plot()

    # Affichage (IMPORTANT : 2 arguments)
    cv2.imshow("Detection defauts - temps reel", annotated_frame)

    # Quitter avec q
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
