

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('image-gallery');
    const yearElement = document.getElementById('year');
    const accessKey = '0PgGVdPRtXjOLIhe7TQUECJzvwR19yG5JPMHuzOoFKM'; // Replace with your Unsplash Access Key
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=50`;

    // Fetch images from Unsplash API
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';

                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description;

                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn';
                downloadBtn.innerText = 'Download';

                downloadBtn.addEventListener('click', () => downloadImage(photo.urls.full));

                imageContainer.appendChild(img);
                imageContainer.appendChild(downloadBtn);
                gallery.appendChild(imageContainer);
            });
        })
        .catch(error => {
            console.error('Error fetching data from Unsplash API', error);
        });

    // Set dynamic year in the footer
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});

function downloadImage(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'unsplash-image.jpg'; // You can set a more dynamic name here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading image', error);
        });
}
