import cv2
import numpy as np

def decrypt_image(file_stream, msg_length, password, original_password):
    if password != original_password:
        return None, "Incorrect password"

    img = cv2.imdecode(np.frombuffer(file_stream.read(), np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        return None, "Invalid image format"

    # Retrieve the message length from the first 4 pixels
    extracted_length = 0
    for i in range(4):
        extracted_length |= img[0, i, 0] << (i * 8)

    message_bytes = bytearray()
    index = 0

    for n in range(img.shape[0]):
        for m in range(img.shape[1]):
            for z in range(3):
                if n == 0 and m < 4:  # Skip first 4 pixels
                    continue
                if index < extracted_length:
                    message_bytes.append(img[n, m, z])
                    index += 1
                else:
                    break
            if index >= extracted_length:
                break
        if index >= extracted_length:
            break

    message = message_bytes.decode('utf-8', errors='ignore')
    return message, None
