# -*- coding: utf-8 -*-

import cv2
import torch
from torchvision import transforms, models
from PIL import Image
from ultralytics import YOLO
from datetime import datetime

# ==============================
# 1. CHARGEMENT DES MODELES
# ==============================

# --- Modele YOLO (detection des defauts)
yolo_model = YOLO("C:/Users/user/Downloads/Modeleyolodetection/best.pt")

# --- Modele classification des postes
model_path = "model_classification.pth"

classes = ['Poste_1', 'Poste_2', 'Poste_3', 'Poste_4', 'Poste_5', 'Poste_6']

clf_model = models.resnet18(weights=None)
clf_model.fc = torch.nn.Linear(clf_model.fc.in_features, len(classes))
clf_model.load_state_dict(torch.load(model_path, map_location="cpu"))
clf_model.eval()

# Transformation pour la classification
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# ==============================
# 2. WEBCAM
# ==============================

cap = cv2.VideoCapture(1)

if not cap.isOpened():
    print("Erreur: webcam non detectee")
    exit()

# ==============================
# 2.b ENREGISTREMENT VIDEO
# ==============================

# Récupération des paramètres vidéo
width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps    = int(cap.get(cv2.CAP_PROP_FPS))
if fps == 0:
    fps = 20  # valeur par défaut si la webcam ne donne pas de FPS

# Nom du fichier avec date/heure
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
video_name = f"enregistrement_{timestamp}.mp4"

# Codec MP4
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(video_name, fourcc, fps, (width, height))

print("Enregistrement video en cours :", video_name)

# ==============================
# 3. BOUCLE TEMPS REEL
# ==============================

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # ------------------------------
    # A. DETECTION DES DEFAUTS (YOLO)
    # ------------------------------
    results = yolo_model(frame, conf=0.25)
    annotated_frame = results[0].plot()

    # ------------------------------
    # B. CLASSIFICATION DU POSTE
    # ------------------------------
    img_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    img_tensor = transform(img_pil).unsqueeze(0)

    with torch.no_grad():
        outputs = clf_model(img_tensor)
        _, predicted = outputs.max(1)
        predicted_class = classes[predicted.item()]

    # ------------------------------
    # C. AFFICHAGE DU POSTE
    # ------------------------------
    cv2.putText(
        annotated_frame,
        f"Poste: {predicted_class}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # ------------------------------
    # D. ENREGISTREMENT DE LA FRAME
    # ------------------------------
    out.write(annotated_frame)

    # ------------------------------
    # E. AFFICHAGE FINAL
    # ------------------------------
    cv2.imshow("Detection defauts + Classification poste", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# ==============================
# 4. LIBERATION DES RESSOURCES
# ==============================

cap.release()
out.release()
cv2.destroyAllWindows()

print("Video sauvegardee :", video_name)
