export const convertFileToBinary = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function (event) {
            const binaryData = event.target.result;
            resolve(binaryData);
        };
        
        reader.onerror = function (error) {
            reject(error); 
        };
        
        reader.readAsArrayBuffer(file);
    });
};