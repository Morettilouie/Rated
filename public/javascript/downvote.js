async function downvoteClickHandler(event) {
    event.preventDefault();
    const id = event.currentTarget.value;
    const response = await fetch('/api/comments/downvote', {
      method: 'PUT',
      body: JSON.stringify({
        comment_id: id
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
  
  const downVoteButtons = document.querySelectorAll(".downvote-btn");
downVoteButtons.forEach((button) => {
  button.addEventListener("click", downvoteClickHandler);
});