async function ratingChangedHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      const response = await fetch('/api/posts/update-rating', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          rating_value: event.target.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}
document.querySelector('#rating').addEventListener('change', ratingChangedHandler);