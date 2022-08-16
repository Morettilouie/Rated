
async function upvoteClickHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
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
const buttons = document.querySelectorAll(".upvote-btn");
buttons.forEach((button) => {
  button.addEventListener("click", upvoteClickHandler);
});

