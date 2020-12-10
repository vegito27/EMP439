
const express=require('express')

const app=express()

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json()) 


const mysql=require('mysql')

const con=mysql.createConnection({
	host:"localhost",
	user:'root',
	password:"password",
	database:'excellenceTask'
})


con.connect(err=>{

	if(err) console.error(err);

	else console.log('Connected')	
})


app.get('/candidates',(req,res)=>{

	const get_data="SELECT * from candidate"

		con.query(get_data,(err,result)=>{

			if(err) throw err;

			res.end(JSON.stringify(result))
		})

	})


 app.post('/candidate',(req,res)=>{

	const data=req.body;

	console.log(data);


 	con.query('INSERT INTO candidate SET ?',data,(err,result,fields)=>{

	 if (err) throw err;
	 
	 res.status(200).json("Data Inserted");

 	})
 })

// //insert test score

app.post('/test_score',(req,res)=>{

	const data=req.body;

	con.query('INSERT INTO test_score SET ?',data,(err,result)=>{

		if (err) throw err
	 
		 res.end(JSON.stringify(result));

	})
})


app.get('/test_score/highest_score',(req,res)=>{

 	con.query('select id, SUM(first_round+second_round+third_round) TopScore from test_score GROUP BY id order by TopScore desc limit 1 ',(err,result)=>{

 		if (err) throw err;
	 
			res.end(JSON.stringify(result));    
	})

})


app.get('/test_score/average_score',(req,res)=>{

 	con.query('select id, AVG((first_round+second_round+third_round)/3) AVGScore from test_score GROUP BY id order by AVGScore desc',(err,result)=>{

 		if (err) throw err;
	 
			res.end(JSON.stringify(result));
        
	})

})



app.listen(4000, () => {
  console.log("server start at 4000");

});	 






