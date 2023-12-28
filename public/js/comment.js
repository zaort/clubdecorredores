const newCommentHandler = async (event) => {
 event.preventDefault();

 const description = document.querySelector('#comment-desc').value.trim();

 if (description) {
  const response = await fetch(`/api/posts`, {
   method: 'POST',
   body: JSON.stringify({ description }),
   headers: {
    'Content-Type': 'application/json',
   },
  });

  if (response.ok) {
   // the idea is that the user stays at the same post page after publishing the comment.
   document.location.replace('/post/:id');
  } else {
   alert('Failed to create post')
  }
 }
};

const deleteCommentHandler = async (event) => {
 //how do I segment the comments that the user can delete or not
 if (event.target.hasAttribute('data-id')) {
  const id = event.target.hasAttribute('data-id');

  const response = await fetch(`/api/posts/${id}`, {
   method: 'DELETE',
  });

  if (response.ok) {
   document.location.replace('/post/:id');
  } else {
   alert('Failed to delete the comment');
  }
 }
};

document.querySelector('.new-comment-form').addEventListener('submit', newPostHandler);

document.querySelector('.comment-list').addEventListener('click', deletePostHandler);