from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
from encrypt import encrypt_image
from decrypt import decrypt_image

app = Flask(__name__)
CORS(app)

@app.route('/encrypt', methods=['POST'])
def encrypt():
    try:
        file = request.files['image']
        msg = request.form['message']
        password = request.form['password']

        encrypted_image = encrypt_image(file, msg)
        print('Encryption successful')
        return send_file(encrypted_image, mimetype='image/jpeg')
    except Exception as e:
        print('Encryption error:', str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/decrypt', methods=['POST'])
def decrypt():
    try:
        file = request.files['image']
        msg_length = int(request.form['msg_length'])
        password = request.form['password']
        original_password = request.form['original_password']

        message, error = decrypt_image(file, msg_length, password, original_password)
        if error:
            print('Decryption error:', error)
            return jsonify({'error': error}), 401

        print('Decryption successful:', message)
        return jsonify({'message': message})
    except Exception as e:
        print('Decryption error:', str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
