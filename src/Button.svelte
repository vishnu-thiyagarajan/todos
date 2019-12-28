<script>
	export let buttonName = 'BUTTON';
	export let onclick = ()=> console.log('not yet implemented');
</script>
<button on:click={onclick}>
	{buttonName}
</button>
<style>
	button{
background: white;
padding: 5px;
border: 4px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
	}
	button:focus {
		color: white !important;
background: grey;
border-color: black !important;
	}
	button:hover{
		color: white !important;
background: black;
border-color: black !important;
transition: all 0.4s ease 0s;
	}
</style>