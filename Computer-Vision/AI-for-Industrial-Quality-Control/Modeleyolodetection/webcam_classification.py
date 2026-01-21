# -*- coding: utf-8 -*-

import cv2
import torch
from torchvision import transforms, models
from PIL import Image

# Path to your classification model
model_path = "model_classification.pth"

# The classes in order (must match training)
classes = ['Poste_1', 'Poste_2', 'Poste_3', 'Poste_4', 'Poste_5', 'Poste_6']

# Load the model
model = models.resnet18(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, len(classes))
model.load_state_dict(torch.load(model_path, map_location="cpu"))
model.eval()

# Transform to prepare frames for the model
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Open webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Cannot open webcam")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame (OpenCV BGR) to PIL (RGB)
    img_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    # Prepare frame for classification
    img_tensor = transform(img_pil).unsqueeze(0)

    # Predict class
    with torch.no_grad():
        outputs = model(img_tensor)
        _, predicted = outputs.max(1)
        predicted_class = classes[predicted.item()]

    # Write prediction on frame
    cv2.putText(frame, f"Poste: {predicted_class}", (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Show webcam
    cv2.imshow("Classification Poste - Webcam", frame)

    # Quit with 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
