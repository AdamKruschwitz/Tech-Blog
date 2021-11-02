const articleSubmit = $("#submit-article");
articleSubmit.click(async (event) => {
    // Get the title and body of the article from the page
    const title = $(event.target).siblings("#article-title").val();
    const body = $(event.target).siblings("#article-body").val();
    // console.log(title, body);

    // Make a post request to the controller
    const response = await fetch('/api/articles', {
        method: "POST",
        body: JSON.stringify({title: title, body: body}),
        headers: { 'Content-Type': 'application/json' }
    });

    // If the request was ok, navigate to the resulting articles page. Otherwise, alert that an error has occured.
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('This article could not be created.');
    }
});

const articleSubmitUpdate =$("#submit-article-update");

articleSubmitUpdate.click(async (event) => {
    const title = $(event.target).siblings("#article-title").val();
    const body = $(event.target).siblings("#article-body").val();
    const id = document.location.pathname.split('/')[3];
    const url = '/api/articles/' + id;
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({title: title, body: body}),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('This article could not be created.');
        console.log(await response.json());
    }
})