# V2 of Random Songs From A Random Year - General Assembly Project 2

This is my own v2 updated version of my GA group project 2 (see original repo)[https://github.com/linh-vup/ga-project-2].

# Changes made

- I changed the endpoint to `https://api.napster.com/v2.2/...`. While working on v1 of the project, Napster's v2.2 endoint for top albums stopped working. This caused us to only be able to access a total of 200 albums, which led to some selected years not returning any results (as none of the returned albums were released in the selected year). This endpoint can return a total of 1000 different results.
- Instead of reloading the page for each time the button to get a new song is clicked, I added a state that is toggled `onClick`. I then added it as a dependency for the `useEffect()`, so that it only rerenders the `track` state
- Each time the top albums endpoint is fetched, it gets a random offset parameter. This way the user will get more varied results.
- I changed the styling and made the page more responsive.
