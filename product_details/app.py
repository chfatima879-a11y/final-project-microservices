from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCTS = [
    {"id": 1, "name": "Laptop", "category": "Electronics", "brand": "Dell"},
    {"id": 2, "name": "Smartphone", "category": "Electronics", "brand": "Samsung"},
    {"id": 3, "name": "Headphones", "category": "Audio", "brand": "Sony"},
    {"id": 4, "name": "Office Chair", "category": "Furniture", "brand": "IKEA"}
]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Product Details Service Running"})

@app.route("/products", methods=["GET"])
def get_products():
    return jsonify({"products": PRODUCTS})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
