const St = imports.gi.St;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Utils = imports.misc.extensionUtils.getCurrentExtension().imports.utils;

var move_to_next_monitor_handler;
var move_to_previous_monitor_handler;

function init() {
    move_to_next_monitor_handler = function() {
        global.log("move window to next monitor");
        // arguments: display, screen, null, keybinding

        let monitors = Main.layoutManager.monitors.length
        let focusMonitor = global.display.focus_window.get_monitor();
        // cycle if more than highest index
        let nextMonitor = monitors === focusMonitor + 1 ? 0 : focusMonitor + 1;

        global.display.focus_window.move_to_monitor(nextMonitor);
    };
    
    move_to_previous_monitor_handler = function() {
        global.log("move window to previous monitor");

        let monitors = Main.layoutManager.monitors.length
        let focusMonitor = global.display.focus_window.get_monitor();
        // cycle if index is less than zero
        let previousMonitor = focusMonitor - 1 < 0 ? monitors - 1 : focusMonitor - 1;

        global.display.focus_window.move_to_monitor(previousMonitor);
    };
}

function enable() {
    var mySettings = Utils.getSettings();
    Main.wm.addKeybinding("move-to-next-monitor", 
      mySettings, 
      Meta.KeyBindingFlags.NONE, 
      Shell.KeyBindingMode.ALL, 
      move_to_next_monitor_handler);
    Main.wm.addKeybinding("move-to-last-monitor", 
      mySettings, 
      Meta.KeyBindingFlags.NONE, 
      Shell.KeyBindingMode.ALL, 
      move_to_previous_monitor_handler);
    global.log("move_to_monitor enabled");
}

function disable() {
    Main.wm.removeKeybinding("move-to-next-monitor");
    global.log("move_to_monitor disabled");
}
