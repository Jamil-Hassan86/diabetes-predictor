from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
import joblib
import pandas as pd


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'pizza'

db_config = {
    "host" : "localhost",
    "user" : "root",
    "password" : "Corrosive123",
    "database" : "diabetes_db"
}

def get_db():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return connection
    except Error as e:
        print(e)
        return None
    
model = joblib.load('diabetes_predictor_model.pkl')    

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    ethnicity = data.get("ethnicity")
    
    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    try:
        connection = get_db()
        if connection:
            cursor = connection.cursor()
           
            query = """INSERT INTO users (username, email, hashedPassword, ethnicity)
                       VALUES (%s, %s, %s, %s)"""
            cursor.execute(query, (username, email, hashedPassword, ethnicity))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "User registered successfully!"}), 201
        else:
            return jsonify({"error": "Failed to connect to the database"}), 500
    except Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    email = data.get("email")
    password = data.get("password")
    
    try:
        connection = get_db()
        if connection:
            cursor = connection.cursor()
            query = "SELECT * FROM users WHERE email = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            
            if user:
                hashedPassword = user[3].encode('utf-8')
                
                if bcrypt.checkpw(password.encode('utf-8'), hashedPassword):
                    token = jwt.encode({
                        'user_id': user[0],
                        'username': user[1],
                        'ethnicity': user[4],
                        'exp': datetime.now(timezone.utc) + timedelta(hours=1)
                    }, app.config['SECRET_KEY'], algorithm='HS256')
                    print("Generated Token:", token)

                    cursor.close()
                    connection.close()
                    return jsonify({"message": "Login successful!", "token": token}), 200
                else:
                   
                    cursor.close()
                    connection.close()
                    return jsonify({"error": "Invalid credentials"}), 401
            else:
               
                cursor.close()
                connection.close()
                return jsonify({"error": "User not found"}), 404
        else:
            return jsonify({"error": "Failed to connect to the database"}), 500
    except Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    
def decode_token(token):
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        print("Decoded Token:", decoded)
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@app.route('/check-session', methods=['GET'])
def check_session():
    print("Received request for check-session")  
    token = request.headers.get('Authorization')
    print("Authorization header:", token) 
    
    if token and token.startswith("Bearer "):
        token = token.split(" ")[1]
        decoded = decode_token(token)
        if decoded:
            print("Token decoded successfully:", decoded) 
            return jsonify({"logged_in": True, "username": decoded['username'], "ethnicity" : decoded['ethnicity']}), 200
        return jsonify({"logged_in": False}), 400

@app.route('/predict', methods=['POST'])
def predict():
    
    data = request.get_json()
    age = data['age']
    gender = data['gender']
    height = data['height']
    weight = data['weight']
    ethnicity = data['ethnicity']
    
    
    input_data = pd.DataFrame([[age, gender, height, weight, ethnicity]],
                              columns=['Age', 'Gender', 'Height', 'Weight', 'Ethnicity'])
    

    prediction = model.predict(input_data)
    print(f"prediction: {prediction}")

    if prediction[0] == 1:
        return jsonify({'prediction': "Diabetes"})
    elif prediction[0] == 0:
        return jsonify({'prediction': "No Diabetes"})
    else:
        return jsonify({'error': 'Prediction failed'})

@app.route('/logout', methods=['POST'])
def logout():
   
    return jsonify({"message": "Logout successful!"}), 200


@app.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"error": "Token missing"}), 400
    
    decoded = decode_token(token)
    if decoded:
        user_info = {
            "user_id": decoded['user_id'],
            "username": decoded['username'],
            "ethnicity": decoded['ethnicity']
        }
        return jsonify({"user_info": user_info}), 200
    return jsonify({"error": "Invalid or expired token"}), 401


if __name__ == "__main__":
    app.run(debug=True)