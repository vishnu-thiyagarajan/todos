<script>
	import Button from './Button.svelte'
</script>
<div id='buttongroup'>
<Button buttonName='Lists'/>
<Button buttonName='Today'/>	
<Button buttonName='Scheduled'/>	
</div>
<style>
	#buttongroup{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-self: center;
		grid-gap: 1px;
	}
</style>