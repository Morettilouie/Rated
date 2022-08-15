async function ratingChangedHandler(event) {
    event.preventDefault();
}
document.querySelector('#rating').addEventListener('change', ratingChangedHandler);