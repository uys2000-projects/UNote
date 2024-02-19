<script lang="ts">
  import EditorJS from "@editorjs/editorjs";

  import Header from "@editorjs/header";
  import Table from "@editorjs/table";
  import Checklist from "@editorjs/checklist";
  import NestedList from "@editorjs/nested-list";
  import Marker from "@editorjs/marker";
  import InlineCode from "@editorjs/inline-code";
  import Underline from "@editorjs/underline";
  import TextSpolier from "editorjs-inline-spoiler-tool";

  import { onMount } from "svelte";
  import { convertHTML } from "../../services/editorJS";

  let editor: EditorJS;
  onMount(() => {
    editor = new EditorJS({
      holder: "editor",
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        table: Table,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        underline: Underline,
        TextSpolier: TextSpolier,
      },
      minHeight: (window.innerHeight * 3) / 4,
    });
  });

  const clickToEditor = function () {
    editor.focus();
    return "";
  };
  export const getHTML = function () {
    return editor.save().then(convertHTML);
  };
</script>

<div
  tabindex="0"
  on:click={clickToEditor}
  class="prose m-0 h-full"
  on:keydown={clickToEditor}
  on:keyup={clickToEditor}
  role="button"
>
  <div id="editor" class="border-neutral rounded-box p-1"></div>
</div>
