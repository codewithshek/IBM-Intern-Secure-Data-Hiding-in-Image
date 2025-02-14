import React, { useState, useRef } from 'react';
import { Upload, Lock, Unlock, AlertCircle, Download } from 'lucide-react';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [decryptPassword, setDecryptPassword] = useState('');
  const [encryptedImage, setEncryptedImage] = useState<string | null>(null);
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setEncryptedImage(null);
        setDecryptedMessage('');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDecryptionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEncryptedImage(event.target?.result as string);
        setDecryptedMessage('');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const encryptMessage = () => {
    if (!image || !message || !password) {
      setError('Please provide an image, message, and password');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Store message length and password hash in first few pixels
      const msgBytes = new TextEncoder().encode(message);
      data[0] = msgBytes.length & 0xFF;
      data[1] = (msgBytes.length >> 8) & 0xFF;

      // Encrypt message using password as key
      for (let i = 0; i < msgBytes.length; i++) {
        const pixelIndex = (i + 1) * 4;
        const byte = msgBytes[i];
        const key = password.charCodeAt(i % password.length);
        data[pixelIndex] = byte ^ key;
      }

      ctx.putImageData(imageData, 0, 0);
      setEncryptedImage(canvas.toDataURL());
      setError('');
    };
    img.src = image;
  };

  const decryptMessage = () => {
    if (!encryptedImage || !decryptPassword) {
      setError('Please provide an encrypted image and password');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Get message length from first two pixels
      const msgLength = (data[0] | (data[1] << 8));
      
      // Decrypt message
      const msgBytes = new Uint8Array(msgLength);
      for (let i = 0; i < msgLength; i++) {
        const pixelIndex = (i + 1) * 4;
        const key = decryptPassword.charCodeAt(i % decryptPassword.length);
        msgBytes[i] = data[pixelIndex] ^ key;
      }

      try {
        const decrypted = new TextDecoder().decode(msgBytes);
        setDecryptedMessage(decrypted);
        setError('');
      } catch (e) {
        setError('Not Authorized');
        setDecryptedMessage('');
      }
    };
    img.src = encryptedImage;
  };

  const downloadEncryptedImage = () => {
    if (encryptedImage) {
      const link = document.createElement('a');
      link.href = encryptedImage;
      link.download = 'encrypted-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Secure Data Hiding in Image</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Encryption Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" /> Encryption
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Upload Image</span>
                </label>
                {image && (
                  <img src={image} alt="Original" className="mt-4 max-w-full h-auto" />
                )}
              </div>

              <textarea
                placeholder="Enter secret message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded h-32"
              />

              <input
                type="password"
                placeholder="Enter encryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded"
              />

              <button
                onClick={encryptMessage}
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
              >
                Encrypt Message
              </button>

              {encryptedImage && (
                <button
                  onClick={downloadEncryptedImage}
                  className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-semibold flex items-center justify-center mt-4"
                >
                  <Download className="mr-2" /> Download Encrypted Image
                </button>
              )}
            </div>
          </div>

          {/* Decryption Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Unlock className="mr-2" /> Decryption
            </h2>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDecryptionImageUpload}
                  className="hidden"
                  id="decryptionImageUpload"
                />
                <label
                  htmlFor="decryptionImageUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Upload Image to Decrypt</span>
                </label>
                {encryptedImage && (
                  <img src={encryptedImage} alt="Encrypted" className="mt-4 max-w-full h-auto" />
                )}
              </div>

              <input
                type="password"
                placeholder="Enter decryption password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded"
              />

              <button
                onClick={decryptMessage}
                className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
              >
                Decrypt Message
              </button>

              {decryptedMessage && (
                <textarea
                  value={decryptedMessage}
                  readOnly
                  className="w-full bg-gray-700 p-2 rounded h-32"
                />
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500 p-4 rounded-lg flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Note */}
        <div className="mt-8 text-center text-gray-400">
          <p>If the password is incorrect, it will generate random characters and symbols.</p>
          <p>If the password is correct, it will show you the exact encrypted data.</p>
        </div>

        {/* CodeWithShek Branding */}
        <div
          className="mt-12 flex items-center justify-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-xl cursor-pointer"
          onClick={() => window.open('https://github.com/codewithshek', '_blank')}
        >
          <img
            src="/codewithshek DP.png"
            alt="CodeWithShek"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-center">
            <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Made with ❤️ by CodeWithShek
            </p>
            <p className="text-sm text-gray-400">Secure Image Encryption System</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
