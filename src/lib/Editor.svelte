<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";

  const dispatch = createEventDispatcher();

  export let content = "";

  const contentStore = writable(content);

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit],
      content: content,
      onTransaction: () => {
        dispatch("contentChanged", editor.getHTML());
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor}
  <div class="menu-editor">
    <button
      on:click={() => console.log && editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      class={editor.isActive("bold") ? "is-active" : ""}
    >
      bold
    </button>
    <button
      on:click={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      class={editor.isActive("italic") ? "is-active" : ""}
    >
      italic
    </button>
    <button
      on:click={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      class={editor.isActive("strike") ? "is-active" : ""}
    >
      strike
    </button>
    <button
      on:click={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      class={editor.isActive("code") ? "is-active" : ""}
    >
      code
    </button>
    <button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
      clear marks
    </button>
    <button on:click={() => editor.chain().focus().clearNodes().run()}>
      clear nodes
    </button>
    <button
      on:click={() => editor.chain().focus().setParagraph().run()}
      class={editor.isActive("paragraph") ? "is-active" : ""}
    >
      paragraph
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
    >
      h1
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
    >
      h2
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
    >
      h3
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
    >
      h4
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
    >
      h5
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
    >
      h6
    </button>
    <button
      on:click={() => editor.chain().focus().toggleBulletList().run()}
      class={editor.isActive("bulletList") ? "is-active" : ""}
    >
      bullet list
    </button>
    <button
      on:click={() => editor.chain().focus().toggleOrderedList().run()}
      class={editor.isActive("orderedList") ? "is-active" : ""}
    >
      ordered list
    </button>
    <button
      on:click={() => editor.chain().focus().toggleCodeBlock().run()}
      class={editor.isActive("codeBlock") ? "is-active" : ""}
    >
      code block
    </button>
    <button
      on:click={() => editor.chain().focus().toggleBlockquote().run()}
      class={editor.isActive("blockquote") ? "is-active" : ""}
    >
      blockquote
    </button>
    <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
      horizontal rule
    </button>
    <button on:click={() => editor.chain().focus().setHardBreak().run()}>
      hard break
    </button>
    <button
      on:click={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().chain().focus().undo().run()}
    >
      undo
    </button>
    <button
      on:click={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().chain().focus().redo().run()}
    >
      redo
    </button>
  </div>
{/if}

<div class="wrapper">
  <div class="element-wrapper" bind:this={element} />
</div>

<style>
  .wrapper {
    border: 1px solid var(--border-color);
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    margin-top: 15px;
  }

  .element-wrapper {
    padding: 1rem;
    flex: 1 1 0%;
    resize: both;
    overflow: auto;
  }

  .element-wrapper :global(p:first-of-type) {
    margin-top: 0;
  }

  .element-wrapper :global(p:last-of-type) {
    margin-bottom: 0;
  }

  .element-wrapper > :global(.ProseMirror) {
    outline: 0;
  }

  .menu-editor {
    margin-top: 5px;
    padding: 2px;
    min-height: 36px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #f1f1f1;
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
</style>
