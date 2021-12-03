// use inquirer to ask what they want
// make a function for each db_query
// at the end of that query have it return to orginal prompt
// start by making database and tables
// seed the database
// create the views 1 by 1 (SELECT * FROM tableName)
// add department ()
// add employee
// add role - will need to figure out what department it belongs in

db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
        console.log(err)
    }
    console.log(results)
})

db.query("INSERT INTO movies (movie_name) VALUES (?)", [req.body.movie_name], (err, result) => {
    if (err) {
        console.log(err)
    }
    console.log(result)
})