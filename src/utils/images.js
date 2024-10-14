export const convertBase64ToFile = (base64String, fileName) => {

    if (!base64String) {
        return null;
    }

    // Separar la parte base64 de la cabecera de la cadena
    const [metadata, base64Data] = base64String.split(',');
    
    // Extraer el tipo MIME de la cabecera
    const mimeType = metadata.match(/:(.*?);/)[1];
    
    // Decodificar la cadena base64
    const binaryString = atob(base64Data);
    
    // Crear un arreglo de bytes (Uint8Array) con la longitud del string binario
    const byteLength = binaryString.length;
    const byteArray = new Uint8Array(byteLength);

    // Convertir cada carácter a su código de byte
    for (let i = 0; i < byteLength; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    // Crear un archivo con el array de bytes y el tipo MIME
    return new File([byteArray], fileName, { type: mimeType });
}