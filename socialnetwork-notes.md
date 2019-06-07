Part one needs two components. One is Welcome component and second one is registration component. The wrapper around them stays the same.
Welcome components doesn't need a "state". You can make it a function or a class.

The Regist. Component needs to be a class because it needes state, which tell React to re-render. (i.e. when login details are wrong)

After successfull registration/login, the small logo should be shown.

start.js needs know if the user is logged in or not. We need a script running on the browser to know this. If start.js 

app.get("/welcome", function(req, res) {
If (req.serssion.userId) {
	res.redirect("/")
} else {
res.sendFile(__dirname + "/index.html")
}
})

the same applies to app.get(*, function (req, res))
	res.redirect("/welcome")
else… 

Read the url, to see if they are logged in: (location.path). This goes in start.js

let elem; 
if(location.pathname == "/welcome"){
elem = <Welcome />
} else {
elem = <img src = "logo.gif"/>
}

- Make the users table just one, dont create two

we render just with res.json, not with … - for Registration, you can send success: true, or false in case its not successfull

location.href 	or 	location.replace("/")	to redirect on the client side 

###### #################

when the user just typed in, the prop is going to be empty/undefined, so just show  three recent users.

After user has already typed in after some characters, then make the query to search (after first render of recent users). use here use-effect

we should get an array as the result of this query. we have to then transform this list of object to DOM elements (use map() method). Dont forget ot use "key"

check this shit hidding data as html: 

<div key={user.id}>
  <Link to={""/user/${user.id}"}>{user.first} {user.last} <Link/> 
  
</div>

<div contenteditable="plaintext-only"><div key={user.id}>   <Link to={""/user/${user.id}"}>{user.first} {user.last} <Link/>     </div></div>```<div key={user.id}>``  <Link to={""/user/${user.id}"}>{user.first} {user.last} <Link/> ``  ``</div>`

