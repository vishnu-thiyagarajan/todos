<script>
	export let inputName = 'search'
	export let inputid = 'input'
	export let inputdisp = 'hidden'
	
</script>
<div style="visibility:{inputdisp}" id='inputbar'>
  <input id={inputid} type="{inputName}"
  placeholder="{inputName == 'text' ? 'List Name': 'Search...'}" 
  onkeyup={inputName == 'text' ? 'AddList(event)': 'searchList(event)'} />
</div>
<style>
	#inputbar{
		z-index:1;
		display: grid;
        justify-items: center;
        grid-template-columns: 1fr;
		width: 98.75%;
		position: fixed;
		margin-top: 30px;
	}
	input {
		height: 25px;
		border: 3px solid #494949 !important;
		width: 50%;
		outline: none;
	}
</style>