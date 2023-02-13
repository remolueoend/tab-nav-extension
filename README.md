# tab-nav Firefox Extension

A simple,  **permission-less**[^1] manifest v3 extension allowing users to override keyboard shortcuts to navigate between tabs. Because Firefox does not allow users to override the keyboard shortcuts to move focus between tabs, this extensions adds the follwing commands when installed:

## Supported Commands
* Move to previous tab (default: `Ctrl/Cmd + Down`): Move to the tab left of the active tab.
* Move to next tab (default: `Ctrl/Cmd + Up`): Move to the tab right of the active tab.

## Configuration
To override the default shortcuts applied by this extension, navigate to `about:addons` and select "Manage Extension Shortcuts" under the gear menu.

## Why yet another extension?
There are quite a few Firefox extensions for shortcut management out there. Most of them require an absurd amount of permissions to run, while this one is very limited in scope and can run without any additional browser permissions.

[^1]: This extensions does not require any permissions to run, and can therefore neither access browser data nor inject code into websites.
