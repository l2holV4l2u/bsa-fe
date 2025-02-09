from flask import Flask, request, jsonify
import cv2
import numpy as np
from PIL import Image
import base64
import io
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/edgedetection/", methods=["POST"])
def analyze_blood_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image_file = request.files['image']
    img = Image.open(image_file.stream)
    img = np.array(img)

    # Convert to grayscale and detect edges
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)

    # Convert edges image to base64
    _, buffer = cv2.imencode(".png", edges)
    edges_base64 = base64.b64encode(buffer).decode("utf-8")

    return jsonify({
        "edges_image": edges_base64
    })

if __name__ == "__main__":
    app.run()
