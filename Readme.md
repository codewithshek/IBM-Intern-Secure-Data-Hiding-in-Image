# Secure Data Hiding in Image: Protecting Your Confidential Information
A web-based application for securely encrypting and decrypting messages hidden within images, ensuring your sensitive data remains private and protected.

# 🖼️ Preview
![Output-1](https://github.com/user-attachments/assets/3fe24afb-6f08-4ea0-bbb6-7f4869c44f43)


# 📑 Project Presentation
> For a detailed overview of the project, you can refer to the project presentation:

[AICTE x IBM-INTERN-PROJECT-PPT.pptx](./AICTE%20x%20IBM-INTERN-PROJECT-PPT.pptx)

# 🚀 Features
* Encrypt Message: Hide your secret messages within images using a secure encryption password.
* Decrypt Message: Retrieve hidden messages from images by providing the correct decryption password.
* Password Protection: Incorrect passwords generate random characters and symbols, safeguarding your data.

# 🛠 Tech Stack
> Frontend

* HTML, CSS (Tailwind CSS), TypeScript
* React (for building user interfaces)
* Vite (for fast development and build tooling)

> Backend

* Python (Flask for server-side operations)
* Pillow (Python Imaging Library for image processing)
* Cryptography (Python library for encryption and decryption)


# 📂 Directory Structure
```
github.com/codewithshek/ibm-intern-secure-data-hiding-in-image/
├── Readme.md
├── AICTE x IBM-INTERN-PROJECT-PPT.pptx
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
└── src/
    ├── App.tsx
    ├── app.py
    ├── decrypt.py
    ├── encrypt.py
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    └── assets/
```
# 📌 Setup & Installation
### 1. Clone the Repository
```
git clone https://github.com/codewithshek/ibm-intern-secure-data-hiding-in-image.git
cd ibm-intern-secure-data-hiding-in-image
```
### 2. Install Dependencies
```
npm install 
pip install opencv-python
pip install Flask
pip install pillow
```
### 3. Run the Application
```
# Start the frontend
npm run dev

Start the backend
python src/app.py
```

### 4. Access the Application
```
Open your browser and navigate to generated custom url like http://localhost:5173/ to start using the secure data hiding tool.
```

# 📜 Key Functions

* encrypt_message(image, message, password): Encrypts and hides a message within an image using the provided password.
* decrypt_message(image, password): Decrypts and retrieves the hidden message from an image using the correct password.

# 💡 Future Enhancements

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <p>✅ Implement multi-language support.</p>
  <p>✅ Add advanced encryption algorithms for enhanced security.</p>
  <p>✅ Develop a mobile application for on-the-go encryption and decryption.</p>
</div>


# 🤝 Contributing
Feel free to fork and submit pull requests. Any contributions are welcome!

Made with ❤️ by D ABHISHEK YADAV as part of the IBM Cyber Security Internship
