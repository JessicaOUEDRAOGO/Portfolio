# -*- coding: utf-8 -*-

import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models

# === PATH TO YOUR DATASET ===
data_dir = r"C:\Users\ouedraogo\Classification_Poste.v2-second_version_train.folder"

# === PARAMETERS ===
batch_size = 32
num_epochs = 20
learning_rate = 1e-4

# === IMAGE TRANSFORMS ===
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# === LOAD DATASETS ===
train_set = datasets.ImageFolder(data_dir + r"\train", transform=transform)
val_set   = datasets.ImageFolder(data_dir + r"\valid", transform=transform)

train_loader = DataLoader(train_set, batch_size=batch_size, shuffle=True)
val_loader   = DataLoader(val_set, batch_size=batch_size)

num_classes = len(train_set.classes)
print("Detected classes:", train_set.classes)

# === MODEL (ResNet18) ===
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, num_classes)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# === TRAINING LOOP ===
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

for epoch in range(num_epochs):
    model.train()
    total_loss = 0.0

    for imgs, labels in train_loader:
        imgs, labels = imgs.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(imgs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print("Epoch {}/{} - Loss: {:.4f}".format(epoch + 1, num_epochs, total_loss / len(train_loader)))

# === SAVE MODEL ===
torch.save(model.state_dict(), "model_classification.pth")
print("Saved model: model_classification.pth")
