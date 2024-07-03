<template>
    <div class="main">
      <div id='title'>
            <input 
            type="text" 
            name="title" 
            placeholder="Title"
            v-model="title" 
            class="content-title"      
            />            
      </div>
      <div class="experiment">        
        <div class="bars">
          <vue-file-toolbar-menu v-for="(content, index) in bars_content" :key="'bar-'+index" :content="content" />
        </div>

        <div ref="text" class="text" :contenteditable="edit_mode" spellcheck="false" v-html="initial_html"></div>

      </div>
    </div>
  </template>
  
  <script>
  import VueFileToolbarMenu from '@/components/Bar/BarMain.vue' // set from 'vue-file-toolbar-menu' in your application
  import DemoCustomButton from './ToolbarButton.vue'
  import { mapGetters } from "vuex";
  // import DemoCustomMenuItem from './CustomMenuItem.vue'
  /* eslint-disable */
  
  export default {
    components: { VueFileToolbarMenu },
  
    data () {
      return {
        initial_html: this.contentAsHTML,
        color: "rgb(74, 238, 164)",
        font: "Avenir",
        theme: "default",
        edit_mode: true,
        check1: false,
        check2: false,
        check3: true,
        title: this.titleSaved,
      }
    },
  
    computed: {  
      // Read the API documentation about the available menu content options  
      bars_content () {
        const mac_os_menus = (this.theme == "mac-os") ? [
          {
            html: '<svg width="16" height="16" viewBox="0 0 16 16" style="fill: var(--bar-font-color, black)" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',
            menu: [{ text: "Log Out", hotkey: "shift+command+q", click: () => alert("No way!") }]
          },
          {
            html: '<span style="font-weight:700">YourApp</span>',
            menu: [{ text: "Quit", hotkey: "command+q", click: () => alert("No way!") }]
          }
        ] : [];
  
        return [
          [
            ...mac_os_menus,
            {
              text: "File",
              menu: [
                { text: "New", click: () => { this.$refs.text.innerHTML = this.initial_html; this.focus_text(); } },
                { text: "Save...", click: () => alert("You're amazing, "+(prompt("What's your name?")||"friend")+"!") },
                { is: "separator" },
                { text: "Print...", click: () => window.print() },
                { is: "separator" },
                { text: "Close", click () { if(confirm("Do you want to close the page?")) window.close(); } },
              ]
            },

            { is: "spacer" },
            { icon: this.edit_mode ? "lock_open" : "lock", title: "Toggle edit mode", active: !this.edit_mode, click: () => { this.edit_mode = !this.edit_mode } }
          ],
          [
            { icon: "format_align_left", title: "Align left", hotkey: this.isMacLike ? "shift+command+l" : "ctrl+shift+l", click: () => document.execCommand("justifyLeft") },
            { icon: "format_align_center", title: "Align center", hotkey: this.isMacLike ? "shift+command+e" : "ctrl+shift+e", click: () => document.execCommand("justifyCenter") },
            { icon: "format_align_right", title: "Align right", hotkey: this.isMacLike ? "shift+command+r" : "ctrl+shift+r", click: () => document.execCommand("justifyRight") },
            { icon: "format_align_justify", title: "Justify content", hotkey: this.isMacLike ? "shift+command+j" : "ctrl+shift+j", click: () => document.execCommand("justifyFull") },
            { is: "separator" },
            { icon: "format_bold", title: "Bold", hotkey: this.isMacLike ? "command+b" : "ctrl+b", click: () => document.execCommand("bold") },
            { icon: "format_italic", title: "Italic", hotkey: this.isMacLike ? "command+i" : "ctrl+i", click: () => document.execCommand("italic") },
            { icon: "format_underline", title: "Underline", hotkey: this.isMacLike ? "command+u" : "ctrl+u", click: () => document.execCommand("underline") },
            { icon: "format_strikethrough", title: "Strike through", click: () => document.execCommand("strikethrough") },
            {
              is: "button-color",
              type: "compact",
              menu_class: "align-center",
              stay_open: false,
              color: this.color,
              update_color: (new_color) => { this.color = new_color; document.execCommand('foreColor', false, new_color.hex8); }
            },
            { is: "separator" },
            {
              html: '<div class="ellipsis" style="width: 80px; font-size: 95%;">'+this.font+'</div>',
              title: "Font",
              chevron: true,
              menu: this.font_menu,
              menu_height: 200
            },
            { is: "separator" },
            { icon: "format_list_numbered", title: "Numbered list", click: () => document.execCommand("insertOrderedList") },
            { icon: "format_list_bulleted", title: "Bulleted list", click: () => document.execCommand("insertUnorderedList") },
            { is: "separator" },
            { icon: "format_indent_increase", title: "Increase indent", click: () => document.execCommand("indent") },
            { icon: "format_indent_decrease", title: "Decrease indent", click: () => document.execCommand("outdent") },
            { is: "separator" },
            { is: DemoCustomButton, text: "line 324", click: () => alert("My action!") },
            { is: "separator" },
            { html: "<b>H1</b>", title: "Header 1", click: () => document.execCommand('formatBlock', false, '<h1>') },
            { html: "<b>H2</b>", title: "Header 2", click: () => document.execCommand('formatBlock', false, '<h2>') },
            { html: "<b>H3</b>", title: "Header 3", click: () => document.execCommand('formatBlock', false, '<h3>') },
            { icon: "format_clear", text: "Clear", title: "Clear format", click () { document.execCommand('removeFormat'); document.execCommand('formatBlock', false, '<div>'); } }
          ]
        ]
      },
      isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
      font_menu () {
        return this.font_list.map(font => {
          return {
            html: '<span class="ellipsis" style="font-family:'+font+'">'+font+'</span>',
            icon: (this.theme != "default" && this.font == font) ? 'check' : false,
            active: (this.font == font),
            height: 20,
            click: () => {
              document.execCommand("fontName", false, font);
              this.font = font;
            }
          };
        });
      },
      font_list: () => ["Arial", "Avenir", "Courier New", "Garamond", "Georgia", "Impact", "Helvetica", "Palatino", "Roboto", "Times New Roman", "Verdana"],
      is_touch_device: () => ("ontouchstart" in window) || (window.navigator.msMaxTouchPoints > 0),

      ...mapGetters({
                    authenticated: 'auth/authenticated',
                    username: 'auth/username',
                    userId: 'auth/userId',
                    folderId: 'folder/folderId',
                    folderTitle: 'folder/title',
                    contentAsHTML: 'content/contentAsHTML',
                    toBeUpdated: 'content/toBeUpdated', 
                    titleSaved: 'content/title', 
                     
            })
    },
  
    methods: {
      focus_text () {
          this.$refs.text.focus();
          document.execCommand('selectAll', false, null);
          document.getSelection().collapseToEnd();
      },
      textSave(){
        console.log("ToolBar.vue -> methods -> textSave -> line 382: " + this.contentAsHTML)     
        const newText = this.$refs.text.innerHTML          
        const data = {
          text: newText, 
          title: this.title, 
          folderId: this.folderId}  
        return data;
         
      },
    },  
    mounted () {
      if(!this.is_touch_device) this.focus_text();
      /* eslint-disable */
      if(!this.toBeUpdated){
        this.$store.dispatch('content/initNew')
      }
      if(true) {
        this.initial_html = this.contentAsHTML
        this.title = this.titleSaved
      };
    }
  } 
  </script>
