import cv2
import numpy as np
import joblib
import warnings
from flask import Flask, request, jsonify
import os
import tempfile

# Suppress the scikit-learn version warning
warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)

# Load the trained model
model_path = "road_damage_model.pkl"
try:
    model = joblib.load(model_path)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Function to extract features from image patches
def extract_features(image_patch):
    patch = cv2.resize(image_patch, (64, 64))  # Resize patch to a standard size
    gray = cv2.cvtColor(patch, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    edges = cv2.Canny(gray, 100, 200)  # Edge detection using Canny
    edge_density = np.sum(edges) / (64 * 64)  # Compute edge density
    hist = cv2.calcHist([patch], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256]).flatten()  # Color histogram
    features = np.hstack([edge_density, hist])  # Combine features
    return features

# Function to detect damage regions in the image
def detect_damage_regions(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)  # Apply Gaussian blur
    edges = cv2.Canny(blurred, 50, 150)  # Edge detection
    contours, _ = cv2.findContours(edges.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # Find contours
    
    boxes = []
    for cnt in contours:
        if cv2.contourArea(cnt) < 100:  # Ignore small contours
            continue
        x, y, w, h = cv2.boundingRect(cnt)  # Get bounding box
        boxes.append((x, y, x+w, y+h))  # Store bounding boxes
    
    return boxes

# Function to map predictions to a damage score
def map_prediction_to_score(pred):
    # Map model predictions to damage scores
    return {0: 30, 1: 60, 2: 100}.get(pred, 0)

# Function to map damage score to severity level
def map_score_to_severity(score):
    if score >= 50:
        return "high"
    elif score >= 20:
        return "medium"
    else:
        return "low"

# Process an image and return damage assessment
def analyze_road_damage(image_path):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Could not read image"}
    
    # Detect damage regions
    boxes = detect_damage_regions(image)
    
    # Process each detected region
    total_score = 0
    count = 0
    damage_regions = []
    
    for (x1, y1, x2, y2) in boxes:
        patch = image[y1:y2, x1:x2]  # Extract the image patch
        if patch.size == 0 or patch.shape[0] == 0 or patch.shape[1] == 0:  # Skip empty patches
            continue
        
        try:
            features = extract_features(patch)  # Extract features from the patch
            
            if model is not None:
                prediction = model.predict([features])[0]  # Predict damage level (0, 1, 2)
            else:
                # Fallback if model failed to load
                prediction = 1  # Default to medium damage
                
            score = map_prediction_to_score(prediction)  # Get the corresponding score
            
            total_score += score
            count += 1
            
            damage_regions.append({
                "coordinates": [int(x1), int(y1), int(x2), int(y2)],
                "damage_level": int(prediction),
                "score": int(score)
            })
        except Exception as e:
            print(f"Error processing patch: {e}")
            continue
    
    # Calculate the final damage score (average of all regions)
    final_score = int(total_score / count) if count > 0 else 0
    severity = map_score_to_severity(final_score)
    
    return {
        "damage_detected": count > 0,
        "damage_count": count,
        "damage_regions": damage_regions,
        "final_score": final_score,
        "severity": severity
    }

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image selected"}), 400
    
    # Save the uploaded file temporarily
    temp_fd, temp_path = tempfile.mkstemp(suffix='.jpg')
    try:
        file.save(temp_path)
        
        # Analyze the image
        result = analyze_road_damage(temp_path)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500
    finally:
        os.close(temp_fd)
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
