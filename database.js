const mysql=require('mysql')

const con=mysql.createConnection({
	host:"localhost",
	user:'root',
	password:"password",
	database:'excellenceTask'
})


con.connect(err=>{

	if(err) console.error('Error while connecting')

	else console.log('Connected')	

   // initialize databse

	const dataBase="CREATE DATABASE excellenceTask";

		con.query(dataBase,(err,result)=>{

			if(err) console.log('Error while creating Database');
			else console.log('DataBase Created');


		})


	//SELECT Database

	const data_base="use excellenceTask"

		con.query(data_base,(err,result)=>{

			if(err) console.log('Error while creating Database');

			else console.log('Database Selected')

		})


	const table1="CREATE TABLE candidate(id INT AUTO_INCREMENT,name VARCHAR(255),email VARCHAR(255),PRIMARY KEY (id));"


		con.query(table1,(err,result)=>{

			if(err) console.log('Error while creating Database');

			else console.log('Table Created')

		})	

	
	const table2="CREATE TABLE test_score(id INT AUTO_INCREMENT, candidate_id INT, first_round INT, second_round INT, third_round INT, PRIMARY KEY (id), FOREIGN KEY(candidate_id) REFERENCES candidate(id) ON DELETE CASCADE );"


		con.query(table2,(err,result)=>{

			if(err) throw err

			else console.log('Test Score Table Created')

		})

})

