async function upvoteClickHandler(event) {
  event.preventDefault();
  const id = event.currentTarget.value;
  const response = await fetch("/api/comments/upvote", {
    method: "PUT",
    body: JSON.stringify({
      comment_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}
// puts a click listener on all of the vote up buttons

const upVoteButtons = document.querySelectorAll(".upvote-btn");
upVoteButtons.forEach((button) => {
  button.addEventListener("click", upvoteClickHandler);
});

