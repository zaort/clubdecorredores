const newCommentHandler = async (event) => {
 event.preventDefault();

 const description = document.querySelector('#comment-desc').value.trim();
 console.log(window.location.href.split("/")[4]);
 if (description) {
  const response = await fetch(`/api/comment`, {
   method: 'POST',
   body: JSON.stringify({ description, post_id: window.location.href.split("/")[4] }),
   headers: {
    'Content-Type': 'application/json',
   },
  });

  if (response.ok) {
   console.log(response);
   // the idea is that the user stays at the same post page after publishing the comment.
   document.location.reload();
  } else {
   alert('Failed to create post')
  }
 }
};

const deleteCommentHandler = async (event) => {
 //how do I segment the comments that the user can delete or not
 if (event.target.hasAttribute('data-id')) {
  const id = event.target.hasAttribute('data-id');

  const response = await fetch(`/api/comment/${id}`, {
   method: 'DELETE',
  });

  if (response.ok) {
   document.location.reload();
  } else {
   alert('Failed to delete the comment');
  }
 }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);

document.querySelector('.comment-list').addEventListener('click', deleteCommentHandler);