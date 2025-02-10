import cv2
import numpy as np
import io

def encrypt_image(file_stream, message):
    img = cv2.imdecode(np.frombuffer(file_stream.read(), np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Invalid image format")

    message_length = len(message)
    if message_length > img.shape[0] * img.shape[1] * 3:
        raise ValueError("Message is too long for this image")

    message_bytes = message.encode('utf-8')
    
    # Store length in first 4 pixels
    for i in range(4):
        img[0, i, 0] = (message_length >> (i * 8)) & 255  # Store length in R channel

    # Encode the message
    index = 0
    for n in range(img.shape[0]):
        for m in range(img.shape[1]):
            for z in range(3):
                if n == 0 and m < 4:  # Skip first 4 pixels (reserved for length)
                    continue
                if index < len(message_bytes):
                    img[n, m, z] = message_bytes[index]
                    index += 1
                else:
                    break
            if index >= len(message_bytes):
                break
        if index >= len(message_bytes):
            break

    _, buffer = cv2.imencode('.png', img)  # Use PNG to avoid lossy compression
    encrypted_image = io.BytesIO(buffer)
    return encrypted_image
