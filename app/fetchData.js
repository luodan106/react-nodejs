async function fetchGetData(url){
	let response=await fetch(url,{
		method:'get'
	});

	let data1=await response.json();

	return data1;
}

export default fetchGetData;