---
title: Setup Vim with Unity
author: Alexandre Chêne
description: How to setup Vim with Unity
date: "2018-10-02T00:00:00.000Z"
---

I really enjoy **Vim**. This old and fast terminal editor matches entirely my free spirit. So when I started to use Unity I was rapidly looking for a way to integrate Vim in my workflow. Very few IDEs and text editors are officially supported by Unity -- only Visual Studio.

I want two things -- **autocompletion** with *omnifunc* and a consistent **syntax highlighter** for C#.

We could achieve this goal through one plugin and ~ 2 lines in our vimrc.
I first got some problems but everything is solved thanks to folks' help from the Github issue.

##### We need some prerequisites.

- We must use *Vim* 8+ or *Neovim* with python support. `:has(python) || has(python3)`.

- We must have *libv* installed on our machine. `brew install libv` for macOS.

The plugin to install is **omnisharp-vim**. It relies on omnisharp-roslyn.<br/>
*Omnisharp* is a set of tools for integrations -- various IDE like VSCode use this -- and *Roslyn* is a C# compiler, open sourced by Microsoft.

```
Plug 'OmniSharp/omnisharp-vim'
```

After installing the plugin, we want to tell omnisharp to use (and install) the mono version of the roslyn server (it is **needed** for Unity).

To achieve this, we set this variable in our vimrc:
```
let g:OmniSharp_server_use_mono = 1
```


Finally, we run **:OmniSharpInstall** in order to install omnisharp with the proper version of roslyn server.

Optionally, if we are using *Ale* (sure we do), we must tell *Ale* to only use our omnisharp linter for cs files:

```
let g:ale_linters = {
\ 'cs': ['OmniSharp']
\}
```

Now, we are good to go. The *Omnisharp* server will start automatically when we open some .cs files.
Useful commands:

- **:OmnisharpStartServer** to restart the server.
- **:OmnisharpCodeFormat** to format the current buffer according to our custom config in our project folder.
- **:OmniSharpGotoDefinition** for jumping to the definition of the symbol under the cursor.

Things that could be better:

I would love to have C# with LSP (Language Server Protocol). It seems that it is in work in progress [here](https://github.com/OmniSharp/csharp-language-server-protocol).
Smarter and better highlights would be great too. I will write an issue on that.

If you have more informations or updates, don't hesitate!

[My vimrc](https://github.com/kooparse/dotfiles/blob/master/.vimrc) :)
