const St = imports.gi.St;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Utils = imports.misc.extensionUtils.getCurrentExtension().imports.utils; 

const mySettings = Utils.getSettings();

let move_to_next_monitor_handler;
let move_to_last_monitor_handler;

function init() {
    move_to_next_monitor_handler = function() {
        global.log("move window to next monitor");
        // arguments: display, screen, null, keybinding
//        let keybindingArgument = arguments[3];
//        global.log("keybinding-name" + keybindingArgument.get_name());
//        global.log("keybinding-modifiers" + keybindingArgument.get_modifiers());
//        global.log("keybinding-mask" + keybindingArgument.get_mask());

        if (global.display.focus_window.get_monitor() == 1) {
            return;
        } else {
            global.display.focus_window.move_to_monitor(1);
        }
    };
    move_to_last_monitor_handler = function() {
        global.log("move window to last monitor");
        if (global.display.focus_window.get_monitor() == 0) {
            return;
        } else {
            global.display.focus_window.move_to_monitor(0);
        }
    };
}

function enable() {
    global.display.add_keybinding("move-to-next-monitor", mySettings, Meta.KeyBindingFlags.NONE, move_to_next_monitor_handler);
    global.display.add_keybinding("move-to-last-monitor", mySettings, Meta.KeyBindingFlags.NONE, move_to_last_monitor_handler);
    global.log("move_to_monitor enabled");
}

function disable() {
    global.display.remove_keybinding("move-to-next-monitor");
    global.log("move_to_monitor disabled");
}
