const images = document.querySelectorAll('.Member img');

images.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)'; 
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)'; 
    });
});
