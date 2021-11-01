// Get the login button
const loginSubmit = $("#submit-login");
loginSubmit.click(async (event) => {
    // Get the input username and password
    const password = $(event.target).prev().children().children("#login-password").val();
    const email = $(event.target).prev().children().children("#login-email").val();

    // post to api/login to attempt a login
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(response);
    // If the response is ok, redirect. otherwise, alert that login failed.
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Login failed');
    }
});

// Create account
const createAccountSubmit = $("#submit-create-account");
createAccountSubmit.click(async (event) => {
    const username = $(event.target).prev().children().children("#create-username").val();
    const email = $(event.target).prev().children().children("#create-email").val();
    const password = $(event.target).prev().children().children("#create-password").val();
    const passwordConfirm = $(event.target).prev().children().children("#create-password-confirm").val();

    if(password !== passwordConfirm) {
        alert("Could not create account: Passwords did not match.");
        return;
    }

    const response = await fetch("/api/users/", {
        method: 'POST',
        body: JSON.stringify({email, username, password}),
        headers: { 'Content-Type': 'application/json' }
    });
    // If account creation was successful, the user has already been logged in.
    // Otherwise, alert that there was a problem creating the account.
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert("There was a problem creating this account. Email may already be in use.");
    }
});