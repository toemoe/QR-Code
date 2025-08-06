import html2canvas from 'html2canvas';

export const downloadImage = async (elem: HTMLElement, filename: string, format: 'png' | 'jpeg' = 'png') => {
    try {
        const canvas = await html2canvas(elem, {
            scale: 1,
            logging: true,
            useCORS: true,
            allowTaint: true,
        });

        return new Promise<void>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.href = url;
                link.download = `${filename}.${format}`;
                link.click();
                
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    resolve();
                }, 100);
            }, `image/${format}`, 0.9);
        });
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
    }
};