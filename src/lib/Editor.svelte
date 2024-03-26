<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import AddImageButton from './AddImageButton.svelte'
  
    const dispatch = createEventDispatcher();
    
    let element
    let editor

    export let content;
    
    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
        ],
        content: content,
        onTransaction: () => {
          dispatch('contentChanged', editor.getHTML());
        },
      })
    })
  
    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    })
  </script>
  
  {#if editor}
  <div class="buttons">
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
      class:active={editor.isActive('heading', { level: 1 })}
    >
      H1
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class:active={editor.isActive('heading', { level: 2 })}
    >
      H2
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      class:active={editor.isActive('heading', { level: 3 })}
    >
      H3
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      class:active={editor.isActive('heading', { level: 4 })}
    >
      H4
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      class:active={editor.isActive('heading', { level: 5 })}
    >
      H5
    </button>
    <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
      P
    </button>
  </div>
  {/if}
  
  <div class="content" bind:this={element} />

  <AddImageButton bind:editor />
  
  <style>
    button.active {
      background: black;
      color: white;
    }

    .buttons {
      display: flex;
      margin: 10px 0;
    }

    .buttons button:first-child {
      margin-left: 0;
    }

    .content {
      border: 1px solid var(--border-color);
      padding: 20px;
      border-radius: 5px;
      background-color: #fff;
    }
  </style>
  