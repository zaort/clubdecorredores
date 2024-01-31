const newPostHandler = async (event) => {
 event.preventDefault();

 const title = document.querySelector('#post-title').value.trim();
 const description = document.querySelector('#post-desc').value.trim();

 if (title && description) {
  const response = await fetch(`/api/post`, {
   method: 'POST',
   body: JSON.stringify({ title, description }),
   headers: {
    'Content-Type': 'application/json',
   },
  });

  if (response.ok) {
   document.location.replace('/profile');
  } else {
   alert('Failed to create post')
  }
 }
};

const deletePostHandler = async (event) => {
 if (event.target.hasAttribute('data-id')) {
  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/post/${id}`, {
   method: 'DELETE',
  });

  if (response.ok) {
   document.location.replace('/profile');
  } else {
   alert('Failed to delete post');
  }
 }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);

document.querySelector('.posts-list').addEventListener('click', deletePostHandler);

// check the db to see if the posts, comment table has any info
// check on the .posts-list, when commented it works