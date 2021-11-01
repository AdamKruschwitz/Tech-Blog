const articleSubmit = $("#submit-article");
articleSubmit.click(async (event) => {
    // Get the title and body of the article from the page
    const title = $(event.target).siblings("#article-title").val();
    const body = $(event.target).siblings("#article-body").val();
    console.log(title, body);

    // Make a post request to the controller
    const response = await fetch('/api/articles', {
        method: "POST",
        body: JSON.stringify({title: title, body: body}),
        headers: { 'Content-Type': 'application/json' }
    });

    // If the request was ok, navigate to the resulting articles page. Otherwise, alert that an error has occured.
    if(response.ok) {
        console.log();
        document.location.replace('/');
    } else {
        alert('This article could not be created.');
    }
});
