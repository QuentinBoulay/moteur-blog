<script>
	export let editor
	let fileInput
	
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			editor.commands.setImage({src: e.target.result})
			fileInput.value = ''
		};
	}
	
	function handleKeyDown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.target.click();
		}
	}
	
	const onClick = () => {
		fileInput.click()
	}
	
	const onKeyDown = (e) => {
		handleKeyDown(e)
	}
</script>

<button on:click={onClick} on:keydown={onKeyDown}>
	Ajouter une image
	<input style="display:none"
				 aria-label="lorem ipsum"
				 type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileInput} >
</button>