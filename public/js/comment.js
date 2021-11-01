const commentSubmit = $("#submit-comment");
commentSubmit.click(async (event) => {
    const body = $(event.target).siblings("#comment-body").val();
    const article_id = parseInt(document.location.pathname.split('/')[2]);
    
    const response = await fetch('/api/comments/', {
        method: "POST",
        body: JSON.stringify({ body, article_id }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert('Your comment could not be posted.');
    }
});