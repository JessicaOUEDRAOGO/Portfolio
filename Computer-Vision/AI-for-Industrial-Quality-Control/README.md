# AI for Industrial Quality Control  
## Real-Time Defect Detection in a Multi-Station Assembly Line

This project presents a **computer vision–based quality control system** designed for a **snowshoe assembly cell** composed of **six sequential assembly stations**.

The solution addresses inefficiencies observed in traditional end-of-line quality inspection by introducing **camera-based inspection at the end of each assembly station**, enabling early and progressive defect detection.

---

## Industrial Context

The assembly cell consists of **six stations**, where different assembly operations are performed sequentially.

- Final quality inspection was originally performed **only after station 6**
- If an assembly error occurred at an early station (e.g. station 2 or 3), it was often detected too late
- This required **disassembling components assembled at stations 4, 5, and 6**
- Result: **time loss, rework, and reduced production efficiency**

---

## Proposed Solution

A **real-time visual quality control system** is deployed **at the end of each assembly station**.

At each station:
- A camera captures the assembled product
- A deep learning model:
  - Detects the **current station number**
  - Identifies **all relevant assembly defects**, including:
    - Defects specific to the current station  
    - Defects originating from **previous stations**, even if they were not detected earlier  

This design increases the probability of detecting an error as the product progresses along the line and ensures that **missed defects at early stations can still be detected at later ones**.

---

## Defect Detection Logic by Station

The model is trained to recognize:
- The **assembly station number**
- The set of defects that may appear **up to that station**

This means that at station *k*, the model can detect:
- Defects introduced at station *k*  
- Any defects introduced at stations **1 to k-1** that remain visible

### Station 1
- `missing_crampon`
- `missing_crampon_screw`

### Station 2
- `missing_washer`
- `missing_heel_lift_screw`
- `missing_butterfly_nut`
- `bad_assembly_of_heel_lift`

### Station 3
- `missing_lock`

### Station 4
- `missing_plate`
- `missing_claw_screw`
- `missing_claw`

### Station 5
- `open_lock`

### Station 6
- `missing_pivot`

---

## Computer Vision Pipeline

The project follows an end-to-end computer vision workflow:

1. **Image Acquisition**
   - Images captured directly from the assembly environment  
   - Real production conditions and viewpoints  

2. **Dataset Creation**
   - Total of **422 labeled images**  
   - Each image annotated with:
     - Assembly station number  
     - Visible assembly defects  

3. **Data Annotation**
   - Labeling performed using **Roboflow**

4. **Model Training**
   - Model trained locally  
   - Object detection architecture based on **YOLOv8**  
   - Optimized for real-time inference  

5. **Inference & Visualization**
   - Live detection on camera streams  
   - Visual feedback highlighting:
     - Detected defects  
     - Recognized station number  

---

## Key Benefits

- Progressive defect detection along the assembly line  
- Higher probability of detecting early-stage errors  
- Reduction of unnecessary downstream disassembly  
- Time savings and improved production flow  
- Scalable approach adaptable to other multi-station manufacturing systems  

---

## Demonstration

A demonstration video showcasing **real-time detection** is available in the `demo/` folder.

---

## Visual Results

The `screenshots/` directory contains:
- Samples of each defect class from the dataset  
- Detection results per station  
- Model predictions in real production conditions  

---

## Repository Content

This repository includes:
- Annotated dataset samples  
- Trained YOLOv8 model  
- Python inference and training scripts  
- Demonstration video  

---

## Notes

This project is presented as a **technical portfolio project**, focused on industrial computer vision and multi-station quality control.  
The methodology can be extended to other sequential manufacturing and assembly systems.

