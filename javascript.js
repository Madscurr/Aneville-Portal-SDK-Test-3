// Set up table structure
function init(){
	var queryResult = db.Execute('SELECT TOP 1 * FROM sampleTable');
  	var row = JSON.parse(queryResult);
  	
  	if(row.length>0 && typeof row[0].Error != 'undefined'){
    	db.Execute('CREATE TABLE sampleTable(id INTEGER PRIMARY KEY IDENTITY(1,1), userId nvarchar(50), value nvarchar(50));');
      	return '{"result":"created table"}';
    }else
  		return '{"result":"table exists"}';
}

// Retreive data from the database
function getData(){
	return db.Execute('SELECT * FROM sampleTable');
}

// Insert into the database
function insert(){
	if(args.Get("value").length>50)
      return '{"result":"error"}';
  	else{
    	db.Execute('INSERT INTO sampleTable VALUES(@currentUser,@value)');
      	return getData();
    }
}