export const resizeImage = async (base64String, maxSizeInKB = 500) => {
    if (!base64String) {
        return null;
    }

    const MAX_SIZE_IN_BYTES = maxSizeInKB * 1024;

    const resizeBase64Image = (base64String, newWidth, mimeType, quality) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64String;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = newWidth / img.width;
                const newHeight = img.height * scale;

                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                resolve(canvas.toDataURL(mimeType, quality));
            };
        });
    };

    const getFileSizeInBytes = (base64String) => {
        const stringLength = base64String.length - (base64String.indexOf(',') + 1);
        const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
        return stringLength * 0.75 - padding;
    };

    let resizedBase64 = base64String;
    let mimeType = base64String.match(/data:(.*?);base64/)[1];

    // Reducir calidad y tamaño hasta que esté por debajo de 500KB
    let quality = 1.0;
    let currentSize = getFileSizeInBytes(base64String);

    while (currentSize > MAX_SIZE_IN_BYTES && quality > 0.1) {
        const img = new Image();
        img.src = resizedBase64;

        // Espera a que la imagen se cargue antes de redimensionar
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        // Redimensionar la imagen a un 80% del tamaño original
        const newWidth = img.width * 0.8;

        // Redimensionar y reducir la calidad
        resizedBase64 = await resizeBase64Image(resizedBase64, newWidth, mimeType, quality);
        currentSize = getFileSizeInBytes(resizedBase64);

        // Disminuir la calidad en cada iteración
        quality -= 0.1;
    }

    return resizedBase64; // Devuelve la imagen comprimida en base64
};

