self.addEventListener('message', function (e) {
	var data = e.data;
	
	GetData();

	function GetData() {
		debugger;

		try {
			
			var begin = new Date().getTime();
			var end = new Date().getTime() + 1001;
			var i = 0;
			
			do {
				if((end - begin) > 250 ) {
					postMessage("http://localhost:5885/uploads/" + data[i][0] + "/" + data[i][1]);
					begin = new Date().getTime();
					//console.log(data[i][1]);		
					i++;
				}
				end = new Date().getTime();		  					
			} while(i < data.length);	
		} catch(e) {
			postMessage(null);
		}
	}

}, false);