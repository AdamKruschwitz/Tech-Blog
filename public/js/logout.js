const logoutLink = $("#logout");
logoutLink.click(async () => {
    const response = await fetch('/api/logout', {
        method: "POST"
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('There was a problem logging out. Log out failed.');
    }
});