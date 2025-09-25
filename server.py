from flask import Flask, request, jsonify, render_template
import util

app = Flask(__name__, static_folder="static", template_folder="templates")

util.load_saved_artifacts()

# Serve frontend
@app.route("/")
def home():
    return render_template("index.html")

# API to get location names
@app.route("/get_location_names")
def get_location_names():
    response = jsonify({
        "locations": util.get_location_names()
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# API to predict home price
@app.route("/predict_home_price", methods=["POST"])
def predict_home_price():
    total_sqft = float(request.form["total_sqft"])
    bhk = int(request.form["bhk"])
    bath = int(request.form["bath"])
    location = request.form["location"]

    response = jsonify({
        "estimated_price": util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Bangalore Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host="0.0.0.0", port=5000)
