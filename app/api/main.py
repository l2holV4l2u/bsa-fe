from flask import Flask, request, jsonify
import cv2
import numpy as np
from PIL import Image
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fit_ellipse_equation(ellipse):
    (x_center, y_center), (major_axis, minor_axis), angle = ellipse
    angle_rad = np.radians(angle)
    A = (np.cos(angle_rad) ** 2) / (major_axis ** 2) + (np.sin(angle_rad) ** 2) / (minor_axis ** 2)
    B = 2 * np.cos(angle_rad) * np.sin(angle_rad) * (1 / major_axis ** 2 - 1 / minor_axis ** 2)
    C = (np.sin(angle_rad) ** 2) / (major_axis ** 2) + (np.cos(angle_rad) ** 2) / (minor_axis ** 2)
    D = -2 * A * x_center - B * y_center
    E = -2 * C * y_center - B * x_center
    F = A * x_center ** 2 + B * x_center * y_center + C * y_center ** 2 - 1
    return {"A": A, "B": B, "C": C, "D": D, "E": E, "F": F}

def encode_image(img):
    _, buffer = cv2.imencode(".png", img)
    return base64.b64encode(buffer).decode("utf-8")

def fit_ellipse_area(ellipse):
    major_axis, minor_axis = ellipse[1]
    area = np.pi * (major_axis / 2) * (minor_axis / 2)
    return area

@app.route("/api/edgedetection/", methods=["POST"])
def analyze_blood_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    image_file = request.files['image']
    proimg = Image.open(image_file.stream)
    proimg = np.array(proimg)
    proimg = cv2.cvtColor(proimg, cv2.COLOR_BGR2GRAY)
    proimg = cv2.GaussianBlur(proimg, (5,5), 0)
    _, proimg = cv2.threshold(proimg, 127, 255, cv2.THRESH_BINARY)
    proimg = cv2.morphologyEx(proimg, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(20,20)))
    contours, _ = cv2.findContours(proimg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour_img = cv2.cvtColor(proimg, cv2.COLOR_GRAY2BGR)
    ellipses = []
    ellipse_areas = []    
    
    print(contours)
    for contour in contours:
        if len(contour) >= 5:
            ellipse = cv2.fitEllipse(contour)
            area = fit_ellipse_area(ellipse)
            ellipses.append(ellipse)
            ellipse_areas.append(area)
            #cv2.ellipse(contour_img, ellipse, (0, 0, 255), 2)
    if ellipses:
        largest_ellipse_index = np.argmax(ellipse_areas)
        largest_ellipse = ellipses[largest_ellipse_index]
        cv2.ellipse(contour_img, largest_ellipse, (0, 0, 255), 2)
        ellipse_equation = fit_ellipse_equation(largest_ellipse)
    else:
        largest_ellipse = None
        ellipse_equation = "No valid ellipses found"

    return jsonify({
        "contour_image": encode_image(contour_img),
        "ellipse_equation": ellipse_equation
    })

if __name__ == "__main__":
    app.run(debug=True)
