# airlinesurvey_node

This will be Node.js, Express.js and MongoDB version of airlineysurvey_netbeans file.  

Part I: create a web questionnaire that asks for user opinions on a set of criteria for a recent airline flight, post info to database, return user results, as well as all user opinions taken. 

Task 1: set up node with express/handlebars/body-parser modules, break existing HTML pages into Handlebars templates. 

- handlebars is nice as a template vehicle, I like the double and triple bracket notation. But it falls short big time in handling more complex set ups, like nested loops where the outside loop is referenced in the inside loop, or any set up that requires references to multiple objects or arrays. There may be ways to do it, but learning it would be timely and unduly burdensome. It was much easier to set up those kinds of things with javascript and then import the finished html to handlebars. Will definitely look into react, angular or another platform moving forward.

- i'm starting to like the central command feel of the main js file and having other 'pods' of functions that all stem from it. It seems node/express really attempts to make good on MVC architecture. I'm sure the same enviroment could be set up with java servlets, with one being the main command station, but the servlet environment still felt like servlets were more automomous units geared to work together, not necessarily a bad thing either.

- i understand the loathe of overbearing and overloaded things IDEs and GUI interfaces, but I'm still not getting the big thrill over doing everything from the console. feels like a step back, like the young coders all dig it because they never had to really deal with the green screen, so this is sorta nostalgic. Hey, there's nothing wrong with a little gui, a few buttons here and there to make things easier. 

Task 2: Integrate with MongoDB

-  setting up map collections is definitely cooler with js than java, which makes for connecting form data to front and back-end js objects a breeze. Now for that beast mongo. 

- Mongo tells you how to connect to it, mongo tells you how to create collections, add data to them, mongo tells you how to then find that data and send to an array. What Mongo does not tell you in pages and pages of reading its online manual is: how to take that array that mongo created, and very easily and simply copy it to a javascript array or object, so we can go about our business with the rest of the necessary coding. Chapters and chapters and links abound but no simple answer to that simple question.  

AM I MISSING SOMETHING HERE! WHAT IS SO FREAKIN COMPLICATED ABOUT THAT? SHOULDN'T THAT INFO BE ON THE FIRST PAGE?

Sooo, after more reading of blogs and tons of other stackoverflow posts, I see the problem is not with Mongo, but with the "asynchronous" nature of node.js. Really?  All the blogs say, "get used to it," "embrace asynchronous." And I continue to ask WHY?  What advantage does this flawed technology give over the millions and millions of websites built on 'synchronous' platforms that seem to be working just fine that I would spend an endless amount of time having to compensate for the 'asynchronous' nature of node? It doesn't move any faster, the coding is not any easier, in fact, it makes it all the more cumbersome. Once again, it seems technology is taking a step back just for the idea of doing something "new" and novel. I don't want novelty, I want better, faster and more efficient results. I really don't know if I'm going to waste any more time working with such an unworkable software platform. Full stack blows...
