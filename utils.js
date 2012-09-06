const Gio = imports.gi.Gio;

const Extension = imports.misc.extensionUtils.getCurrentExtension();

// End of imports.

function getSettings() {
    let dir = Extension.dir.get_child('schemas').get_path();
    let source = Gio.SettingsSchemaSource.new_from_directory(dir,
            Gio.SettingsSchemaSource.get_default(),
            false);

    if(!source) {
        throw new Error('Error Initializing the thingy.');
    }

    let schema = source.lookup('org.gnome.shell.extensions.mmh', false);

    if(!schema) {
        throw new Error('Schema missing.');
    }

    global.log("loaded schema: " + schema);
    
    let settings = new Gio.Settings({
        settings_schema: schema
    });



    return settings;
}
