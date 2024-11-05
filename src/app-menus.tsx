export default function AppMenus() {
  function openDocs() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://solidjs.com")
    );
  }

  function openGithub() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://github.com/solidjs/solid")
    );
  }

  function openDiscord() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://discord.com/invite/solidjs")
    );
  }

  return (
    <>
      <menu attachToMainMenu>
        <menu-item
          title="Quit"
          shortcutKey="q"
          onClick={() => {
            NSApp.terminate(NSApp);
          }}
        />
      </menu>
      <menu title="Help" attachToMainMenu>
        <menu-item title="Open Docs" shortcutKey="i" onClick={openDocs} />
        <menu-item title="Open Github" shortcutKey="g" onClick={openGithub} />
        <menu-item title="Discord" shortcutKey="d" onClick={openDiscord} />
      </menu>
    </>
  );
}
