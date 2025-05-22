import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { resizeImage } from '../../utils/resizeImage';

const aspectRatios = {
  Cuadrado: 1 / 1,
  Vertical: 4 / 5,
};

export const CropImage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(4 / 5);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async (imageSrc, croppedAreaPixels) => {
    try {
      const image = new Image();
      image.src = imageSrc;
      return new Promise((resolve, reject) => {
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = croppedAreaPixels.width;
          canvas.height = croppedAreaPixels.height;

          ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
          );

          const base64Image = canvas.toDataURL('image/jpeg');
          const resized64Image = resizeImage(base64Image, 500);

          resolve(resized64Image);
        };

        image.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.error('Error al recortar la imagen:', error);
    }
  };

  const handleSave = async () => {
    const croppedImage = await getCroppedImage(state.image, croppedAreaPixels);

    if (state.type === 'profile') {
      localStorage.setItem('profileBase64', croppedImage);
    } else if (state.type === 'instagram') {
      localStorage.setItem('instagramBase64', croppedImage);
    }

    if (state.from === 'admin') {
      navigate('/admin', { state: { type: state.type, from: 'crop' } });
    } else if (state.from === 'publish') {
      navigate('/publish', { state: { type: state.type, from: 'crop' } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute top-5 z-10 mt-4">
        <select
        value={aspect}
        onChange={(e) => setAspect(Number(e.target.value))}
        className="block mx-auto mb-5 px-6 py-2 rounded-2xl bg-black text-white font-bold cursor-pointer transition-transform active:scale-95 w-40 text-center"
        >
        {Object.entries(aspectRatios).map(([label, ratio]) => (
            <option key={label} value={ratio}>
            {label}
            </option>
        ))}
        </select>
        </div>
      <div className="flex-grow w-full relative" style={{ height: 400 }}>
        <Cropper
          image={state?.image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="absolute bottom-20 z-10 px-4 w-full max-w-md">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className="zoom-range w-full"
        />
      </div>

      <div className="absolute bottom-5 z-10 mt-4">
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded-2xl transition-transform transform active:scale-95"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
