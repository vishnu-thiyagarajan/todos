<script>
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Listcontainer from './Listcontainer.svelte'
	import Inputbar from './Inputbar.svelte'
	let newListInput = 'hidden', searchInput = 'hidden';
	const onNewList = ()=>{searchInput='hidden'; newListInput= newListInput=='visible' ? 'hidden' : 'visible'}
	const onSearch = ()=>{newListInput='hidden'; searchInput= searchInput=='visible' ? 'hidden' : 'visible'}
</script>
<div id="mainGrid">
<!--<Taskbar firstButtonName='Back' secondButtonName='Clear Done' position = 'top'/>-->
<Navbar onNewList={onNewList} onSearch={onSearch}/>
<Inputbar inputid='newlistname' inputName='text' inputdisp={newListInput} />
<Inputbar inputid='seachinput' inputName='search' inputdisp={searchInput}/>
<Listcontainer />
<Taskbar firstButtonName='Rename' secondButtonName='Delete'/>
<!--<Taskbar firstButtonName='Done' position = 'bottom'/>-->
</div>
<style>
#mainGrid{
	display: grid;
}
</style>