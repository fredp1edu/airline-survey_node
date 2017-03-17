# airlinesurvey_node

This will be Node.js, Express.js and MongoDB version of airlineysurvey_netbeans file.  

Part I: create a web questionnaire that asks for user opinions on a set of criteria for a recent airline flight, post info to database, return user results, as well as all user opinions taken. 

Task 1: set up node with express/handlebars/body-parser modules, break existing HTML pages into Handlebars templates. 

- handlebars is nice as a template vehicle, I like the double and triple bracket notation. But it falls short big time in handling more complex set ups, like nested loops where the outside loop is referenced in the inside loop, or any set up that requires references to multiple objects or arrays. There may be ways to do it, but learning it would be timely and unduly burdensome. It was much easier to set up those kinds of things with javascript and then import the finished html to handlebars. Will definitely look into react, angular or another platform moving forward.

- i like the central command feel of the main js file and having other 'pods' of functions that all stem from it. It seems node/express really attempts to make good on MVC architecture. I'm sure the same enviroment could be set up with java servlets, with one being the main command station, but the servlet environment still felt like servlets were more automomous units geared to work together, not necessarily a bad thing either.

- i understand the loathe of overbearing and overloaded things IDEs and GUI interfaces, but I'm still not getting the big thrill over doing everything from the console. feels like a step back, like the young coders all dig it because they never had to really deal with the green screen, so this is sorta nostalgic. Hey, there's nothing wrong with a little gui, a few buttons here and there to make things easier. 

Task 2: Integrate with MongoDB

-  setting up map collections is definitely cooler with js than java, which makes for connecting form data to front and back-end js objects a breeze. Now for that beast mongo. 

Full stack blows...

The asychronous setup just to get db data is a real pain. But having satisfactorily stored and retrieved db information, then overrode the schema to create display attributes with the right key values, we have a decent display of information.

Task 3: Import the carrierdata and set up tie between two collections.

In the java servlet project, i uploaded to the db a 2897-name list of airline carriers, their names, codes, and base countries. After finding out the proper instructions online, uploading to MySQL took less than 3 minutes. But with mongodb, of course, obscure instructions, lacking in any adequate troubleshooting or what-if protocols, the mongo import project didn't work out so well (it didn't work at all). A simple mongoimport to a local db may have worked just fine, but going to the Mongo Atlas (cloud) host may have been a big factor in why I kept getting all the errors. 
-   i ended up taking the cvs file, breaking each column into its own 2897-element array and merging them individually within the mongoose schema via a for loop
-   I was able to have AJAX make a get request to node to reach mongo database, do a regex search for the onekeyup character input and return the data. The regex coding, once I found it better explained on stackoverflow, is very clean coding, compared to the substring method used with java/mysql. I still have to do the following:
    -  Index the carrierName field in the collection (if that's necessary), or at least sort the output alphabetically (mongo). The output is coming out sorted now, but that may be simply because I sorted the list before importing it.
    -  add keyboard functionality (down key sets focus to select box, enter key selects item)
    
Task 4: Integrate CarrierCodes collection with airlineSurveys

Now the the airline carriers are uploaded and there is an autocomplete utility in place, users airCarrier input must match one of the 2897 names listed. Only a server side verification can do that one. The appropriate carrier _id, will be added to the airlineSurveys collection.



